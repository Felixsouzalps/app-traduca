
import { useCallback, useRef, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import EstadoVazio from "@/components/estado-vazio";
import SeletorCurso from "@/components/seletor-curso";
import TelaComAbas from "@/components/tela-com-abas";
import AbasCurso from "@/components/abas-curso";
import ModalPermissaoInstalacao from "@/components/modal-permissao-instalacao";

import {
  buscarCursos,
  buscarMateriais,
  Curso,
  formatarTamanho,
  Material,
} from "@/services/api";

import {
  cursoDaLista,
  escolherCurso,
  lerCursoEscolhido,
} from "@/services/curso-escolhido";

import { abrirMaterial } from "@/services/arquivos";
import materiaisStyles from "@/styles/materiaisStyles";
import { cores } from "@/styles/variaveis";

const filtros = ["Todas", "PDF", "Áudios", "Vídeos"] as const;

type Filtro = (typeof filtros)[number];
type TipoMaterial = "pdf" | "audio" | "video" | "outro";

const EXT_AUDIO = [
  "mp3",
  "wav",
  "m4a",
  "ogg",
  "aac",
  "wma",
  "flac",
];

const EXT_VIDEO = [
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "wmv",
  "m4v",
];

function tipoDoMaterial(material: Material): TipoMaterial {
  const ext = (material.extensao ?? "").toLowerCase();

  if (ext === "pdf") return "pdf";
  if (EXT_AUDIO.includes(ext)) return "audio";
  if (EXT_VIDEO.includes(ext)) return "video";

  return "outro";
}

const iconePorTipo: Record<TipoMaterial, number> = {
  pdf: require("@/assets/images/imgIcon/arquivo.png"),
  audio: require("@/assets/images/imgIcon/audio.png"),
  video: require("@/assets/images/imgIcon/videoaula.png"),
  outro: require("@/assets/images/imgIcon/arquivo.png"),
};

const tipoPorFiltro: Record<Filtro, TipoMaterial | null> = {
  Todas: null,
  PDF: "pdf",
  Áudios: "audio",
  Vídeos: "video",
};

const doisDigitos = (n: number) => String(n).padStart(2, "0");

export default function MateriaisScreen() {
  const [filtroSelecionado, setFiltroSelecionado] =
    useState<Filtro>("Todas");

  const [materiais, setMateriais] = useState<Material[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [idCurso, setIdCurso] = useState<number | undefined>(undefined);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [erroArquivo, setErroArquivo] = useState("");

  const [baixando, setBaixando] = useState<number | null>(null);
  const [materialSelecionado, setMaterialSelecionado] =
    useState<Material | null>(null);

  const [moduloSelecionado, setModuloSelecionado] =
    useState<number | null>(null);
  const [mostrarModulos, setMostrarModulos] = useState(false);

  const [buscaAberta, setBuscaAberta] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");

  const larguraBusca = useRef(new Animated.Value(36)).current;

  // Carrega os materiais do curso escolhido pelo aluno.
  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    setErroArquivo("");

    try {
      const listaCursos = await buscarCursos();

      setCursos(listaCursos);

      if (listaCursos.length === 0) {
        setIdCurso(undefined);
        setMateriais([]);
        setErro("Você ainda não está matriculado em nenhum curso.");
        return;
      }

      const cursoSalvo = await lerCursoEscolhido();
      const atual =
        cursoDaLista(listaCursos, cursoSalvo) ?? listaCursos[0];

      setIdCurso(atual.id_curso);

      const listaMateriais = await buscarMateriais(atual.id_curso);
      setMateriais(listaMateriais);
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível carregar os materiais."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar])
  );

  // Troca o curso e atualiza a preferência compartilhada entre telas.
  async function trocarCurso(id: number) {
    if (id === idCurso) return;

    setCarregando(true);
    setErro("");
    setModuloSelecionado(null);
    setMostrarModulos(false);

    try {
      await escolherCurso(id);

      const listaMateriais = await buscarMateriais(id);

      setIdCurso(id);
      setMateriais(listaMateriais);
      setErroArquivo("");
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível carregar os materiais desse curso."
      );
    } finally {
      setCarregando(false);
    }
  }

  // Identifica os módulos que possuem materiais.
  const modulos = materiais
    .filter(
      (material, indice, lista) =>
        lista.findIndex(
          (item) => item.id_modulo === material.id_modulo
        ) === indice
    )
    .sort((a, b) => a.ordem_modulo - b.ordem_modulo);

  const moduloAtual = modulos.find(
    (modulo) => modulo.id_modulo === moduloSelecionado
  );

  // Aplica os filtros de tipo, módulo e pesquisa.
  const termo = termoBusca.trim().toLowerCase();

  const materiaisFiltrados = materiais.filter((material) => {
    const tipo = tipoPorFiltro[filtroSelecionado];

    if (tipo && tipoDoMaterial(material) !== tipo) {
      return false;
    }

    if (
      moduloSelecionado !== null &&
      material.id_modulo !== moduloSelecionado
    ) {
      return false;
    }

    const texto = `${material.titulo} ${
      material.descricao ?? ""
    }`.toLowerCase();

    if (termo && !texto.includes(termo)) {
      return false;
    }

    return true;
  });

  function alternarBusca() {
    const abrir = !buscaAberta;

    setBuscaAberta(abrir);

    if (!abrir) {
      setTermoBusca("");
    }

    Animated.timing(larguraBusca, {
      toValue: abrir ? 180 : 36,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  async function acessar(
    material: Material,
    modo: "ver" | "baixar"
  ) {
    setErroArquivo("");
    setBaixando(material.id_material);

    try {
      await abrirMaterial(material, modo);

      setMateriais((lista) =>
        lista.map((item) =>
          item.id_material === material.id_material
            ? { ...item, concluido: true }
            : item
        )
      );

      setMaterialSelecionado(null);
    } catch (e) {
      setErroArquivo(
        e instanceof Error
          ? e.message
          : "Não foi possível abrir o material."
      );
    } finally {
      setBaixando(null);
    }
  }

  return (
    <TelaComAbas
      titulo="Materiais"
      subtitulo="Utilize os materiais de apoio"
    >
      <AbasCurso
        abaSelecionada="materiais"
        onSelecionar={(aba) => {
          if (aba === "curso") {
            router.navigate("/curso");
          }
        }}
      />

      <SeletorCurso
        cursos={cursos}
        idSelecionado={idCurso}
        onEscolher={trocarCurso}
      />

      {carregando && (
        <ActivityIndicator size="large" color={cores.azul} />
      )}

      {!carregando && erro ? (
        <EstadoVazio
          icone={require("@/assets/images/imgIcon/mochila-azul.png")}
          texto={erro}
        />
      ) : null}

      {!carregando && !erro && (
        <>
          <Pressable
            style={materiaisStyles.seletorModulo}
            onPress={() => setMostrarModulos((atual) => !atual)}
          >
            <Text style={materiaisStyles.seletorModuloTexto}>
              {moduloAtual
                ? `${doisDigitos(moduloAtual.ordem_modulo)} - Módulo ${moduloAtual.nome_modulo}`
                : "Todos os módulos"}
            </Text>

            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={materiaisStyles.seletorModuloIcone}
            />
          </Pressable>

          {mostrarModulos && (
            <View style={materiaisStyles.opcoesModulo}>
              {[null, ...modulos].map((modulo) => {
                const id = modulo?.id_modulo ?? null;
                const selecionado = id === moduloSelecionado;

                return (
                  <Pressable
                    key={id ?? "todos"}
                    style={[
                      materiaisStyles.filtroPill,
                      selecionado &&
                        materiaisStyles.filtroPillSelecionado,
                    ]}
                    onPress={() => {
                      setModuloSelecionado(id);
                      setMostrarModulos(false);
                    }}
                  >
                    <Text
                      style={[
                        materiaisStyles.filtroPillTexto,
                        selecionado &&
                          materiaisStyles.filtroPillTextoSelecionado,
                      ]}
                    >
                      {modulo
                        ? `${doisDigitos(modulo.ordem_modulo)} - ${modulo.nome_modulo}`
                        : "Todos os módulos"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <View
            style={[
              materiaisStyles.filtrosLinha,
              { position: "relative" },
            ]}
          >
            {filtros.map((filtro) => {
              const selecionado = filtro === filtroSelecionado;

              return (
                <Pressable
                  key={filtro}
                  style={[
                    materiaisStyles.filtroPill,
                    selecionado &&
                      materiaisStyles.filtroPillSelecionado,
                  ]}
                  onPress={() => setFiltroSelecionado(filtro)}
                >
                  <Text
                    style={[
                      materiaisStyles.filtroPillTexto,
                      selecionado &&
                        materiaisStyles.filtroPillTextoSelecionado,
                    ]}
                  >
                    {filtro}
                  </Text>
                </Pressable>
              );
            })}

            <Animated.View
              style={[
                materiaisStyles.btnBusca,
                {
                  position: "absolute",
                  right: 0,
                  width: larguraBusca,
                  backgroundColor: "#FFFFFF",
                  zIndex: 20,
                  elevation: 10,
                },
              ]}
            >
              {buscaAberta && (
                <TextInput
                  autoFocus
                  value={termoBusca}
                  onChangeText={setTermoBusca}
                  placeholder="Pesquisar"
                  placeholderTextColor="#888888"
                  style={materiaisStyles.inputBusca}
                  returnKeyType="search"
                />
              )}

              <Pressable onPress={alternarBusca} hitSlop={8}>
                <Image
                  source={require("@/assets/images/imgIcon/buscar.png")}
                  style={materiaisStyles.iconeBusca}
                />
              </Pressable>
            </Animated.View>
          </View>

          <Text style={materiaisStyles.secaoTitulo}>
            Materiais de Apoio
          </Text>

          {erroArquivo ? (
            <Text style={materiaisStyles.txtErro}>
              {erroArquivo}
            </Text>
          ) : null}

          {materiaisFiltrados.map((material) => {
            const tipo = tipoDoMaterial(material);

            return (
              <View
                key={material.id_material}
                style={materiaisStyles.materialCard}
              >
                <View style={materiaisStyles.materialIconeBox}>
                  <Image
                    source={iconePorTipo[tipo]}
                    style={materiaisStyles.materialIcone}
                    resizeMode="contain"
                  />
                </View>

                <View style={materiaisStyles.materialCorpo}>
                  <Text style={materiaisStyles.materialTitulo}>
                    {material.titulo}
                  </Text>

                  {material.descricao ? (
                    <Text style={materiaisStyles.materialSubtitulo}>
                      {material.descricao}
                    </Text>
                  ) : null}

                  <Text style={materiaisStyles.materialTamanho}>
                    {material.extensao
                      ? material.extensao.toUpperCase()
                      : "Sem arquivo"}

                    {material.tamanho_bytes != null
                      ? ` · ${formatarTamanho(material.tamanho_bytes)}`
                      : ""}

                    {material.concluido ? (
                      <Text style={materiaisStyles.materialConcluido}>
                        {" "}· Concluído
                      </Text>
                    ) : null}
                  </Text>
                </View>

                {material.tem_arquivo && (
                  <View style={materiaisStyles.materialAcoes}>
                    {baixando === material.id_material ? (
                      <ActivityIndicator color={cores.azul} />
                    ) : (
                      <>
                        <Pressable
                          onPress={() => void acessar(material, "ver")}
                          accessibilityRole="button"
                          accessibilityLabel={`Abrir ${material.titulo}`}
                        >
                          <Image
                            source={
                              tipo === "audio" || tipo === "video"
                                ? require("@/assets/images/imgIcon/play.png")
                                : require("@/assets/images/imgIcon/visualizar-azul.png")
                            }
                            style={materiaisStyles.materialAcaoIcone}
                          />
                        </Pressable>

                        <Pressable
                          onPress={() =>
                            setMaterialSelecionado(material)
                          }
                          accessibilityRole="button"
                          accessibilityLabel={`Baixar ${material.titulo}`}
                        >
                          <Image
                            source={require("@/assets/images/imgIcon/download-azul.png")}
                            style={materiaisStyles.materialAcaoIcone}
                          />
                        </Pressable>
                      </>
                    )}
                  </View>
                )}
              </View>
            );
          })}

          {materiaisFiltrados.length === 0 && (
            <Text style={materiaisStyles.placeholderTexto}>
              Nenhum material encontrado para os filtros selecionados.
            </Text>
          )}

          <View style={materiaisStyles.placeholder}>
            <Text style={materiaisStyles.placeholderTexto}>
              {materiaisFiltrados.length === 0
                ? "Ajuste os filtros ou aguarde o professor disponibilizar materiais."
                : "Aguarde o professor disponibilizar mais materiais."}
            </Text>
          </View>

          <ModalPermissaoInstalacao
            visible={materialSelecionado !== null}
            onClose={() => setMaterialSelecionado(null)}
            onPermitir={() => {
              if (materialSelecionado) {
                void acessar(materialSelecionado, "baixar");
              }
            }}
            titulo="Permitir download?"
            mensagem="O aplicativo precisa da sua permissão para baixar este material no dispositivo."
            textoAcao="Baixar"
          />
        </>
      )}
    </TelaComAbas>
  );
}
