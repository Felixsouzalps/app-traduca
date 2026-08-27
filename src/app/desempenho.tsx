import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

import CircularProgress from "@/components/circular-progress";
import TelaComAbas from "@/components/tela-com-abas";
import desempenhoStyles from "@/styles/desempenhoStyles";
import { cores } from "@/styles/variaveis";

const idiomas = ["Inglês", "Italiano", "Português"] as const;

const abas = ["Frequência", "Desempenho"] as const;

const estatisticas = [
  {
    label: "aulas realizadas",
    numero: "10",
    icone: require("@/assets/images/imgIcon/aula-azul.png"),
    corFundo: `${cores.azul}15`,
  },
  {
    label: "exercícios enviados",
    numero: "5",
    icone: require("@/assets/images/imgIcon/tarefas-azul.png"),
    corFundo: `${cores.laranja}15`,
  },
  {
    label: "horas estudadas",
    numero: "12h",
    icone: require("@/assets/images/imgIcon/relogio-azul.png"),
    corFundo: `${cores.roxo}15`,
  },
];

const metasSemanais = [
  "3/3 exercícios",
  "8/8 horas estudadas",
  "5/5 aulas participadas",
];

const habilidades = [
  { label: "Gramática", nota: "9.3", icone: require("@/assets/images/imgIcon/atividade.png") },
  {
    label: "Áudio",
    nota: "9.2",
    icone: require("@/assets/images/imgIcon/fone-atividade.png"),
  },
  {
    label: "Fala",
    nota: "8.9",
    icone: require("@/assets/images/imgIcon/microfone-atividade.png"),
  },
  {
    label: "Leitura",
    nota: "10",
    icone: require("@/assets/images/imgIcon/livro-atividade.png"),
  },
];

export default function DesempenhoScreen() {
  const [idiomaSelecionado, setIdiomaSelecionado] = useState<string>("Italiano");
  const [abaSelecionada, setAbaSelecionada] = useState<string>("Frequência");

  return (
    <TelaComAbas titulo="Desempenho geral" subtitulo="Analise seu progresso e desempenho">
      <Text style={desempenhoStyles.secaoTitulo}>Escolha o idioma</Text>

      <View style={desempenhoStyles.idiomasLinha}>
        {idiomas.map((idioma) => {
          const selecionado = idioma === idiomaSelecionado;

          return (
            <Pressable
              key={idioma}
              style={[
                desempenhoStyles.idiomaPill,
                selecionado && desempenhoStyles.idiomaPillSelecionado,
              ]}
              onPress={() => setIdiomaSelecionado(idioma)}
            >
              <Text
                style={[
                  desempenhoStyles.idiomaPillTexto,
                  selecionado && desempenhoStyles.idiomaPillTextoSelecionado,
                ]}
              >
                {idioma}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={desempenhoStyles.cardProgressoGeral}>
        <View style={desempenhoStyles.progressoGeralTopo}>
          <Text style={desempenhoStyles.progressoGeralLabel}>Progresso Geral</Text>
          <Text style={desempenhoStyles.progressoGeralPorcentagem}>10%</Text>
        </View>

        <View style={desempenhoStyles.barraTrilha}>
          <View style={[desempenhoStyles.barraPreenchimento, { width: "10%" }]} />
        </View>

        <View style={desempenhoStyles.progressoGeralRodape}>
          <Text style={desempenhoStyles.progressoGeralTexto}>
            10 de 100 aulas concluídas
          </Text>

          <View style={desempenhoStyles.estrelasLinha}>
            <Text style={desempenhoStyles.estrela}>★</Text>
            <Text style={desempenhoStyles.estrela}>★</Text>
            <Text style={[desempenhoStyles.estrela, desempenhoStyles.estrelaVazia]}>★</Text>
            <Text style={[desempenhoStyles.estrela, desempenhoStyles.estrelaVazia]}>★</Text>
            <Text style={[desempenhoStyles.estrela, desempenhoStyles.estrelaVazia]}>★</Text>
            <Text style={desempenhoStyles.medalhaTexto}>Bronze</Text>
          </View>
        </View>
      </View>

      <Text style={desempenhoStyles.secaoTitulo}>Estatísticas</Text>

      <View style={desempenhoStyles.statsLinha}>
        {estatisticas.map((estatistica) => (
          <View key={estatistica.label} style={desempenhoStyles.statCard}>
            <View
              style={[desempenhoStyles.statIconeBox, { backgroundColor: estatistica.corFundo }]}
            >
              <Image
                source={estatistica.icone}
                style={desempenhoStyles.statIcone}
                resizeMode="contain"
              />
            </View>
            <Text style={desempenhoStyles.statNumero}>{estatistica.numero}</Text>
            <Text style={desempenhoStyles.statLegenda}>{estatistica.label}</Text>
          </View>
        ))}
      </View>

      <Text style={desempenhoStyles.secaoTitulo}>Meta Semanal</Text>

      <View style={desempenhoStyles.cardMetaSemanal}>
        <View style={desempenhoStyles.metaSemanalColuna}>
          {metasSemanais.map((meta) => (
            <View key={meta} style={desempenhoStyles.metaChecklistItem}>
              <Image
                source={require("@/assets/images/imgIcon/check.png")}
                style={desempenhoStyles.metaCheckIcone}
              />
              <Text style={desempenhoStyles.metaChecklistTexto}>{meta}</Text>
            </View>
          ))}
        </View>

        <View style={desempenhoStyles.metaBadge}>
          <Image
            source={require("@/assets/images/imgIcon/trofeu-azul.png")}
            style={desempenhoStyles.metaBadgeIcone}
          />
          <Text style={desempenhoStyles.metaBadgeTitulo}>Todas as metas batidas.</Text>
          <Text style={desempenhoStyles.metaBadgeSubtitulo}>Continue assim!</Text>
        </View>
      </View>

      <View style={desempenhoStyles.abasLinha}>
        {abas.map((aba) => {
          const selecionada = aba === abaSelecionada;

          return (
            <Pressable
              key={aba}
              style={[
                desempenhoStyles.abaItem,
                selecionada && desempenhoStyles.abaItemSelecionada,
              ]}
              onPress={() => setAbaSelecionada(aba)}
            >
              <Text
                style={[
                  desempenhoStyles.abaItemTexto,
                  selecionada && desempenhoStyles.abaItemTextoSelecionada,
                ]}
              >
                {aba}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {abaSelecionada === "Frequência" ? (
        <View style={desempenhoStyles.cardResumo}>
          <View style={desempenhoStyles.cardResumoTopo}>
            <View style={desempenhoStyles.anelWrapper}>
              <View style={desempenhoStyles.anelFundoBranco} />

              <CircularProgress
                porcentagem={100}
                tamanho={110}
                espessura={9}
                corProgresso={cores.verde}
                corTrilha={`${cores.branco}40`}
              >
                <Text style={desempenhoStyles.resumoAnelNumero}>100%</Text>
                <Text style={desempenhoStyles.resumoAnelLegenda}>Presença</Text>
              </CircularProgress>
            </View>

            <View style={desempenhoStyles.resumoLegendaColuna}>
              <View style={desempenhoStyles.resumoLegendaItem}>
                <View
                  style={[
                    desempenhoStyles.resumoLegendaBolinha,
                    { backgroundColor: cores.verde },
                  ]}
                />
                <Text style={desempenhoStyles.resumoLegendaTexto}>Presenças (10)</Text>
              </View>

              <View style={desempenhoStyles.resumoLegendaItem}>
                <View
                  style={[
                    desempenhoStyles.resumoLegendaBolinha,
                    { backgroundColor: cores.vermelho },
                  ]}
                />
                <Text style={desempenhoStyles.resumoLegendaTexto}>Faltas (0)</Text>
              </View>
            </View>
          </View>

          <View style={desempenhoStyles.resumoDivisor} />

          <Text style={desempenhoStyles.resumoSequenciaTitulo}>
            Sequência de: 10 dias de presença
          </Text>
          <Text style={desempenhoStyles.resumoSequenciaTexto}>
            Continue participando das aulas para ganhar um selo de ouro.
          </Text>
        </View>
      ) : (
        <View style={desempenhoStyles.cardResumo}>
          <View style={desempenhoStyles.habilidadesLinha}>
            {habilidades.map((habilidade, indice) => (
              <View
                key={habilidade.label}
                style={[
                  desempenhoStyles.habilidadeItem,
                  indice < habilidades.length - 1 && desempenhoStyles.habilidadeItemDivisor,
                ]}
              >
                <Image
                  source={habilidade.icone}
                  style={desempenhoStyles.habilidadeIcone}
                  resizeMode="contain"
                />
                <Text style={desempenhoStyles.habilidadeLabel}>{habilidade.label}</Text>
                <Text style={desempenhoStyles.habilidadeNota}>{habilidade.nota}</Text>
              </View>
            ))}
          </View>

          <View style={desempenhoStyles.resumoDivisor} />

          <View style={desempenhoStyles.mediaGeralLinha}>
            <View style={desempenhoStyles.mediaGeralEsquerda}>
              <Text style={desempenhoStyles.mediaGeralEstrela}>★</Text>
              <Text style={desempenhoStyles.mediaGeralLabel}>Média geral</Text>
            </View>
            <Text style={desempenhoStyles.mediaGeralNota}>9.3</Text>
          </View>

          <View style={desempenhoStyles.parabensBox}>
            <Text style={desempenhoStyles.parabensTexto}>
              Excelente desempenho, parabéns!
            </Text>
          </View>
        </View>
      )}
    </TelaComAbas>
  );
}
