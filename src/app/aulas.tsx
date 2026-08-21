import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

import BandeiraIdioma from "@/components/bandeira-idioma";
import CircularProgress from "@/components/circular-progress";
import TelaComAbas from "@/components/tela-com-abas";
import aulasStyles from "@/styles/aulasStyles";
import { cores } from "@/styles/variaveis";

const idiomas = [
  { id: "ingles", label: "Inglês", emoji: "🇺🇸" },
  { id: "portugues", label: "Português", emoji: "🇧🇷" },
  {
    id: "italiano",
    label: "Italiano",
    icone: require("@/assets/images/imgIcon/bandeira-talia.png"),
  },
] as const;

export default function AulasScreen() {
  const [idiomaSelecionado, setIdiomaSelecionado] = useState<string>("ingles");

  return (
    <TelaComAbas titulo="Seja bem-vindo(a) Aluno(a)!">
      {/* Card da aula atual */}
      <View style={aulasStyles.cardAulaAtual}>
        <View style={aulasStyles.cardAulaAtualTopo}>
          <View style={{ marginRight: 12 }}>
            <BandeiraIdioma idioma="ingles" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={aulasStyles.idiomaAtual}>Inglês</Text>
            <View style={aulasStyles.nivelBadge}>
              <Text style={aulasStyles.nivelBadgeTexto}>Básico II</Text>
            </View>
          </View>

          <Pressable style={aulasStyles.btnAvancarCard}>
            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={[aulasStyles.iconeAvancarCard, { tintColor: cores.branco }]}
            />
          </Pressable>
        </View>

        <View style={aulasStyles.infoPillsLinha}>
          <View style={aulasStyles.infoPill}>
            <Image
              source={require("@/assets/images/imgIcon/professor.png")}
              style={aulasStyles.infoPillIcone}
            />
            <Text style={aulasStyles.infoPillTexto}>Prof° Renata Cantero</Text>
          </View>

          <View style={aulasStyles.infoPill}>
            <Image
              source={require("@/assets/images/imgIcon/relogio-azul.png")}
              style={aulasStyles.infoPillIcone}
            />
            <Text style={aulasStyles.infoPillTexto}>Próxima aula{"\n"}Hoje, 18:30</Text>
          </View>
        </View>

        <Pressable style={aulasStyles.btnEntrarAula}>
          <Image
            source={require("@/assets/images/imgIcon/play.png")}
            style={aulasStyles.iconeEntrarAula}
          />
          <Text style={aulasStyles.txtEntrarAula}>Entrar na aula</Text>
        </Pressable>

        <View style={aulasStyles.paginacao}>
          <View style={[aulasStyles.ponto, aulasStyles.pontoAtivo]} />
          <View style={aulasStyles.ponto} />
          <View style={aulasStyles.ponto} />
        </View>
      </View>

      {/* Progresso do curso */}
      <View style={aulasStyles.secaoTitulo}>
        <Text style={aulasStyles.secaoTituloTexto}>Progresso do curso</Text>
        <Pressable>
          <Text style={aulasStyles.secaoLink}>Ver Detalhes</Text>
        </Pressable>
      </View>

      <View style={aulasStyles.cardProgresso}>
        <CircularProgress
          porcentagem={75}
          tamanho={72}
          espessura={7}
          corProgresso={cores.verde}
          corTrilha={cores.azulClaro}
        >
          <Text style={aulasStyles.progressoTextoCentral}>75%</Text>
        </CircularProgress>

        <View style={aulasStyles.progressoColuna}>
          <Text style={aulasStyles.progressoTitulo}>Continue evoluindo!</Text>

          <View style={aulasStyles.progressoStatsLinha}>
            <View>
              <Text style={[aulasStyles.progressoStatNumero, { color: cores.verde }]}>
                18
              </Text>
              <Text style={aulasStyles.progressoStatLegenda}>aulas concluídas</Text>
            </View>

            <View style={aulasStyles.progressoDivisor} />

            <View>
              <Text style={[aulasStyles.progressoStatNumero, { color: cores.branco }]}>
                22
              </Text>
              <Text style={aulasStyles.progressoStatLegenda}>aulas restantes</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Próximas aulas */}
      <View style={aulasStyles.secaoTitulo}>
        <Text style={aulasStyles.secaoTituloTexto}>Próximas aulas</Text>
        <Pressable>
          <Text style={aulasStyles.secaoLink}>Ver Todas</Text>
        </Pressable>
      </View>

      <Pressable style={aulasStyles.cardProximaAula}>
        <View style={{ marginRight: 12 }}>
          <BandeiraIdioma idioma="ingles" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={aulasStyles.proximaAulaTitulo}>Aula 19 - Verb To Be</Text>
          <Text style={aulasStyles.proximaAulaSubtitulo}>15 - 30 min</Text>
        </View>

        <Image
          source={require("@/assets/images/imgIcon/voltar-azul.png")}
          style={aulasStyles.iconeAvancarLista}
        />
      </Pressable>

      {/* Selecione o idioma */}
      <View style={[aulasStyles.secaoTitulo, { marginBottom: 12 }]}>
        <Text style={aulasStyles.secaoTituloTexto}>Selecione o idioma</Text>
      </View>

      <View style={aulasStyles.idiomasLinha}>
        {idiomas.map((idioma) => {
          const selecionado = idioma.id === idiomaSelecionado;

          return (
            <Pressable
              key={idioma.id}
              style={[
                aulasStyles.cardIdioma,
                selecionado && aulasStyles.cardIdiomaSelecionado,
              ]}
              onPress={() => setIdiomaSelecionado(idioma.id)}
            >
              <View style={aulasStyles.cardIdiomaBandeira}>
                {"icone" in idioma ? (
                  <Image
                    source={idioma.icone}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={aulasStyles.cardIdiomaBandeiraEmoji}>
                    {idioma.emoji}
                  </Text>
                )}
              </View>
              <Text style={aulasStyles.cardIdiomaTexto}>{idioma.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </TelaComAbas>
  );
}
