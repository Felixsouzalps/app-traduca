
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  createAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  type AudioPlayer,
} from "expo-audio";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import EstadoVazio from "@/components/estado-vazio";
import TelaComAbas from "@/components/tela-com-abas";
import {
  AtividadeDetalhe,
  buscarAtividade,
  formatarData,
  responderAtividadeComAudios,
  StatusAtividade,
} from "../services/api";
import { ouvirAudioAtividade } from "../services/arquivos";
import atividadeStyles from "../styles/atividadeStyles";
import { cores } from "../styles/variaveis";

const statusInfo: Record<
  StatusAtividade,
  { texto: string; cor: string }
> = {
  pendente: { texto: "Pendente", cor: cores.laranja },
  enviada: { texto: "Enviada", cor: cores.azul },
  corrigida: { texto: "Corrigida", cor: cores.verde },
};

type AudioResposta = {
  uri: string;
  nome: string;
  tipo: string;
};

const textoNota = (nota: number) => String(nota).replace(".", ",");

function textoDaOpcao(letra: string, texto: string): string {
  const letraEscapada = letra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const semLetra = texto.replace(
    new RegExp(
      `^\\s*(?:\\(${letraEscapada}\\)|${letraEscapada}\\s*[).:\\-–])\\s*`,
      "i"
    ),
    ""
  );

  return semLetra.trim() ? semLetra : texto;
}

export default function AtividadeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [dados, setDados] = useState<AtividadeDetalhe | null>(null);
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [audios, setAudios] = useState<Record<number, AudioResposta>>({});
  const [gravando, setGravando] = useState(false);
  const [questaoGravando, setQuestaoGravando] = useState<number | null>(null);
  const [reproduzindo, setReproduzindo] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [erroEnvio, setErroEnvio] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [abrindoAudio, setAbrindoAudio] = useState(false);

  const gravacao = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [som, setSom] = useState<AudioPlayer | null>(null);

  const carregar = useCallback(async () => {
    if (!id) {
      setErro("Escolha uma atividade na tela Atividades.");
      setCarregando(false);
      return;
    }

    setCarregando(true);

    try {
      const atividade = await buscarAtividade(id);
      setDados(atividade);

      const iniciais: Record<number, string> = {};

      atividade.questoes.forEach((q) => {
        if (q.resposta_aluno) {
          iniciais[q.id_questao] = q.resposta_aluno;
        }
      });

      setRespostas(iniciais);
      setErro("");
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível abrir a atividade."
      );
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  useEffect(() => {
    return () => {
      som?.remove();
    };
  }, [som]);

  async function configurarAudio() {
    const permissao = await requestRecordingPermissionsAsync();

    if (!permissao.granted) {
      throw new Error(
        "Permita o acesso ao microfone nas configurações do aparelho."
      );
    }

    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: "doNotMix",
      shouldRouteThroughEarpiece: false,
    });
  }

  function responder(idQuestao: number, valor: string) {
    setSucesso("");
    setErroEnvio("");

    setRespostas((atuais) => ({
      ...atuais,
      [idQuestao]: valor,
    }));
  }

  async function iniciarGravacao(idQuestao: number) {
    try {
      setErroEnvio("");

      if (gravacao.isRecording) {
        await gravacao.stop();
        setQuestaoGravando(null);
        setGravando(false);
      }

      if (som) {
        som.pause();
        som.remove();
        setSom(null);
        setReproduzindo(null);
      }

      await configurarAudio();

      await gravacao.prepareToRecordAsync();
      gravacao.record();

      setQuestaoGravando(idQuestao);
      setGravando(true);
    } catch (e) {
      setErroEnvio(
        e instanceof Error
          ? e.message
          : "Não foi possível iniciar a gravação."
      );
    }
  }

  async function pararGravacao() {
    if (!gravacao.isRecording || questaoGravando === null) {
      return;
    }

    const idQuestao = questaoGravando;

    try {
      await gravacao.stop();

      const uri = gravacao.uri;

      if (!uri) {
        throw new Error("Não foi possível obter o arquivo gravado.");
      }

      setAudios((atuais) => ({
        ...atuais,
        [idQuestao]: {
          uri,
          nome: `resposta_${idQuestao}.m4a`,
          tipo: "audio/mp4",
        },
      }));

      setQuestaoGravando(null);
      setGravando(false);

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });
    } catch (e) {
      setErroEnvio(
        e instanceof Error
          ? e.message
          : "Não foi possível finalizar a gravação."
      );
    }
  }

  async function ouvirGravacao(idQuestao: number) {
    const audio = audios[idQuestao];

    if (!audio) {
      setErroEnvio("Grave uma resposta antes de ouvir.");
      return;
    }

    try {
      setErroEnvio("");

      if (som) {
        som.pause();
        som.remove();
        setSom(null);
      }

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      const resultado = createAudioPlayer(audio.uri);

      setSom(resultado);
      setReproduzindo(idQuestao);

      resultado.addListener("playbackStatusUpdate", (status) => {
        if (status.didJustFinish) {
          setReproduzindo(null);
          resultado.remove();

          setSom((atual) => (atual === resultado ? null : atual));
        }
      });

      resultado.play();
    } catch (e) {
      setErroEnvio(
        e instanceof Error
          ? e.message
          : "Não foi possível reproduzir a gravação."
      );
    }
  }

  async function ouvirAudio() {
    if (!dados) return;

    setErroEnvio("");
    setAbrindoAudio(true);

    try {
      await ouvirAudioAtividade(dados);
    } catch (e) {
      setErroEnvio(
        e instanceof Error
          ? e.message
          : "Não foi possível abrir o áudio."
      );
    } finally {
      setAbrindoAudio(false);
    }
  }

  async function enviar() {
    if (!dados) return;

    setErroEnvio("");
    setSucesso("");

    if (gravando) {
      setErroEnvio("Pare a gravação antes de enviar as respostas.");
      return;
    }

    const categoriaPronuncia =
      String(dados.categoria?.codigo ?? "").toLowerCase() === "pronuncia";

    const faltando = dados.questoes.filter((q) => {
      const tipo = String(q.tipo).toLowerCase();

      const exigeAudio =
        tipo === "pronuncia" ||
        tipo === "audio" ||
        (categoriaPronuncia && tipo === "texto");

      if (exigeAudio) {
        return !audios[q.id_questao];
      }

      return !respostas[q.id_questao]?.trim();
    });

    if (faltando.length > 0) {
      setErroEnvio(
        `Responda todas as questões antes de enviar (falta${
          faltando.length > 1 ? "m" : ""
        }: ${faltando.map((q) => q.numero).join(", ")}).`
      );
      return;
    }

    setEnviando(true);

    try {
      const mensagem = await responderAtividadeComAudios(
        dados.id_atividade,
        respostas,
        audios
      );

      await carregar();
      setSucesso(mensagem);
    } catch (e) {
      setErroEnvio(
        e instanceof Error
          ? e.message
          : "Não foi possível enviar as respostas."
      );
    } finally {
      setEnviando(false);
    }
  }

  const status = dados ? statusInfo[dados.status] : null;
  const podeEditar = dados?.pode_responder ?? false;

  return (
    <TelaComAbas
      titulo="Atividade"
      subtitulo={dados?.curso ?? "Responda e acompanhe a correção"}
    >
      {carregando && <ActivityIndicator size="large" color={cores.azul} />}

      {!carregando && erro ? (
        <EstadoVazio
          icone={require("@/assets/images/imgIcon/atividades-azul.png")}
          texto={erro}
        />
      ) : null}

      {!carregando && !erro && dados && status && (
        <>
          <View style={atividadeStyles.cardTopo}>
            <View style={atividadeStyles.seloLinha}>
              {dados.categoria ? (
                <View
                  style={[
                    atividadeStyles.selo,
                    { backgroundColor: `${dados.categoria.cor}22` },
                  ]}
                >
                  <Text
                    style={[
                      atividadeStyles.seloTexto,
                      { color: dados.categoria.cor },
                    ]}
                  >
                    {dados.categoria.label}
                  </Text>
                </View>
              ) : null}

              <View
                style={[
                  atividadeStyles.selo,
                  { backgroundColor: `${status.cor}22` },
                ]}
              >
                <Text
                  style={[
                    atividadeStyles.seloTexto,
                    { color: status.cor },
                  ]}
                >
                  {status.texto}
                </Text>
              </View>
            </View>

            <Text style={atividadeStyles.titulo}>{dados.titulo}</Text>

            {dados.finalidade ? (
              <Text style={atividadeStyles.linhaInfoTexto}>
                {dados.finalidade}
              </Text>
            ) : null}

            {dados.descricao ? (
              <Text style={atividadeStyles.descricao}>
                {dados.descricao}
              </Text>
            ) : null}

            {dados.professor ? (
              <View style={atividadeStyles.linhaInfo}>
                <Image
                  source={require("@/assets/images/imgIcon/professor.png")}
                  style={atividadeStyles.linhaInfoIcone}
                />
                <Text style={atividadeStyles.linhaInfoTexto}>
                  Professor {dados.professor}
                </Text>
              </View>
            ) : null}

            {dados.data_entrega ? (
              <View style={atividadeStyles.linhaInfo}>
                <Image
                  source={require("@/assets/images/imgIcon/calendario-azul.png")}
                  style={atividadeStyles.linhaInfoIcone}
                />
                <Text style={atividadeStyles.linhaInfoTexto}>
                  Entrega: {formatarData(dados.data_entrega)}
                </Text>
              </View>
            ) : null}

            {dados.tem_audio && (
              <Pressable
                style={atividadeStyles.btnAudio}
                onPress={ouvirAudio}
                disabled={abrindoAudio}
              >
                {abrindoAudio ? (
                  <ActivityIndicator color={cores.roxo} />
                ) : (
                  <>
                    <Image
                      source={require("@/assets/images/imgIcon/play.png")}
                      style={atividadeStyles.btnAudioIcone}
                    />
                    <Text style={atividadeStyles.btnAudioTexto}>
                      Ouvir o áudio da atividade
                    </Text>
                  </>
                )}
              </Pressable>
            )}
          </View>

          {dados.status === "corrigida" && (
            <View style={atividadeStyles.cardCorrecao}>
              <Text style={atividadeStyles.correcaoRotulo}>Nota</Text>
              <Text style={atividadeStyles.correcaoNota}>
                {dados.nota !== null ? textoNota(dados.nota) : "—"}
              </Text>

              {dados.feedback_professor ? (
                <>
                  <Text
                    style={[
                      atividadeStyles.correcaoRotulo,
                      { marginTop: 8 },
                    ]}
                  >
                    Feedback do professor
                  </Text>
                  <Text style={atividadeStyles.correcaoFeedback}>
                    {dados.feedback_professor}
                  </Text>
                </>
              ) : null}
            </View>
          )}

          {dados.status === "enviada" && (
            <Text style={atividadeStyles.avisoEnviada}>
              Respostas enviadas
              {dados.data_envio
                ? ` em ${formatarData(dados.data_envio.slice(0, 10))}`
                : ""}
              . Aguarde a correção do professor — até lá você ainda pode
              alterar e reenviar.
            </Text>
          )}

          <Text style={atividadeStyles.secaoTitulo}>Questões</Text>

          {dados.questoes.length === 0 && (
            <EstadoVazio
              icone={require("@/assets/images/imgIcon/atividades-azul.png")}
              texto="Esta atividade ainda não tem questões."
            />
          )}

          {dados.questoes.map((questao) => {
            const tipo = String(questao.tipo).toLowerCase();

            const categoriaPronuncia =
              String(dados.categoria?.codigo ?? "").toLowerCase() ===
              "pronuncia";

            const exigeAudio =
              tipo === "pronuncia" ||
              tipo === "audio" ||
              (categoriaPronuncia && tipo === "texto");

            return (
              <View
                key={questao.id_questao}
                style={atividadeStyles.cardQuestao}
              >
                <Text style={atividadeStyles.questaoNumero}>
                  QUESTÃO {questao.numero}
                </Text>

                <Text style={atividadeStyles.questaoEnunciado}>
                  {questao.enunciado}
                </Text>

                {tipo === "multipla_escolha" ? (
                  questao.opcoes.map((opcao) => {
                    const selecionada =
                      respostas[questao.id_questao] === opcao.letra;

                    return (
                      <Pressable
                        key={opcao.letra}
                        style={[
                          atividadeStyles.opcao,
                          selecionada && atividadeStyles.opcaoSelecionada,
                        ]}
                        disabled={!podeEditar}
                        onPress={() =>
                          responder(questao.id_questao, opcao.letra)
                        }
                      >
                        <Text
                          style={[
                            atividadeStyles.opcaoLetra,
                            selecionada &&
                              atividadeStyles.opcaoLetraSelecionada,
                          ]}
                        >
                          {opcao.letra}
                        </Text>

                        <Text style={atividadeStyles.opcaoTexto}>
                          {textoDaOpcao(opcao.letra, opcao.texto)}
                        </Text>
                      </Pressable>
                    );
                  })
                ) : exigeAudio ? (
                  <View style={{ gap: 10, marginTop: 10 }}>
                    <Text style={{ color: "#555", fontSize: 14 }}>
                      Grave sua resposta falando ao microfone.
                    </Text>

                    {!audios[questao.id_questao] ? (
                      <Pressable
                        disabled={!podeEditar || gravando}
                        onPress={() => iniciarGravacao(questao.id_questao)}
                        style={{
                          backgroundColor:
                            gravando &&
                            questaoGravando === questao.id_questao
                              ? "#B91C1C"
                              : cores.azul,
                          padding: 14,
                          borderRadius: 10,
                          alignItems: "center",
                          opacity: !podeEditar || gravando ? 0.6 : 1,
                        }}
                      >
                        <Text
                          style={{ color: "#fff", fontWeight: "700" }}
                        >
                          {gravando &&
                          questaoGravando === questao.id_questao
                            ? "● Gravando..."
                            : "🎙️ Gravar resposta"}
                        </Text>
                      </Pressable>
                    ) : (
                      <>
                        <Text style={{ color: "#16803D", fontSize: 13 }}>
                          ✓ Áudio gravado com sucesso
                        </Text>

                        <Pressable
                          disabled={!podeEditar}
                          onPress={() => ouvirGravacao(questao.id_questao)}
                          style={{
                            backgroundColor: "#E8EEFF",
                            padding: 12,
                            borderRadius: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: cores.azul,
                              fontWeight: "600",
                            }}
                          >
                            {reproduzindo === questao.id_questao
                              ? "▶ Reproduzindo..."
                              : "▶ Ouvir gravação"}
                          </Text>
                        </Pressable>

                        {podeEditar && (
                          <Pressable
                            onPress={() => {
                              setAudios((atuais) => {
                                const novos = { ...atuais };
                                delete novos[questao.id_questao];
                                return novos;
                              });

                              setErroEnvio("");
                              setSucesso("");
                            }}
                            style={{
                              padding: 10,
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ color: "#B91C1C" }}>
                              Gravar novamente
                            </Text>
                          </Pressable>
                        )}
                      </>
                    )}

                    {gravando &&
                      questaoGravando === questao.id_questao && (
                        <Pressable
                          onPress={pararGravacao}
                          style={{
                            backgroundColor: "#333",
                            padding: 14,
                            borderRadius: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{ color: "#fff", fontWeight: "700" }}
                          >
                            ■ Parar gravação
                          </Text>
                        </Pressable>
                      )}
                  </View>
                ) : (
                  <TextInput
                    style={atividadeStyles.campoTexto}
                    multiline
                    editable={podeEditar}
                    placeholder="Escreva sua resposta..."
                    placeholderTextColor="#888888"
                    value={respostas[questao.id_questao] ?? ""}
                    onChangeText={(texto) =>
                      responder(questao.id_questao, texto)
                    }
                  />
                )}

                {questao.correta !== null && (
                  <Text
                    style={[
                      atividadeStyles.resultado,
                      {
                        color: questao.correta
                          ? cores.verde
                          : cores.vermelho,
                      },
                    ]}
                  >
                    {questao.correta
                      ? "✓ Você acertou"
                      : "✗ Resposta incorreta"}
                  </Text>
                )}
              </View>
            );
          })}

          {erroEnvio ? (
            <View style={atividadeStyles.avisoErro}>
              <View style={atividadeStyles.avisoErroIcone}>
                <Text style={atividadeStyles.avisoErroIconeTexto}>!</Text>
              </View>
              <View style={atividadeStyles.avisoErroConteudo}>
                <Text style={atividadeStyles.avisoErroTitulo}>
                  Não foi possível concluir
                </Text>
                <Text style={atividadeStyles.txtErro}>{erroEnvio}</Text>
              </View>
            </View>
          ) : null}

          {sucesso ? (
            <Text style={atividadeStyles.txtSucesso}>{sucesso}</Text>
          ) : null}

          {podeEditar && dados.questoes.length > 0 && (
            <Pressable
              style={[
                atividadeStyles.btnEnviar,
                enviando && atividadeStyles.btnEnviarDesabilitado,
              ]}
              onPress={enviar}
              disabled={enviando || gravando}
            >
              {enviando ? (
                <ActivityIndicator color={cores.branco} />
              ) : (
                <Text style={atividadeStyles.txtBtnEnviar}>
                  {dados.status === "enviada"
                    ? "Reenviar respostas"
                    : "Enviar respostas"}
                </Text>
              )}
            </Pressable>
          )}
        </>
      )}
    </TelaComAbas>
  );
}
