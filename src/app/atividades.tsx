import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

import BarraProgresso from "@/components/barra-progresso";
import CircularProgress from "@/components/circular-progress";
import TelaComAbas from "@/components/tela-com-abas";
import atividadesStyles from "@/styles/atividadesStyles";
import { cores } from "@/styles/variaveis";

const idiomas = ["Inglês", "Italiano", "Português"] as const;

const filtros = ["Pendentes", "Todas", "Concluídas"] as const;

const statusCores: Record<"Concluído" | "Pendente", string> = {
  Concluído: cores.verde,
  Pendente: cores.laranja,
};

const atividades: {
  titulo: string;
  subtitulo: string;
  professor: string;
  entrega: string;
  status: "Concluído" | "Pendente";
  icone: number;
  corIcone: string;
}[] = [
  {
    titulo: "Conjunção de verbo",
    subtitulo: "Exercício de verbo",
    professor: "Professor Renato Caetano",
    entrega: "Entrega: 30/07/2026",
    status: "Concluído",
    icone: require("@/assets/images/imgIcon/atividade.png"),
    corIcone: cores.vermelho,
  },
  {
    titulo: "Conversa no aeroporto",
    subtitulo: "Exercício de fixação",
    professor: "Professor Renato Caetano",
    entrega: "Entrega: 15/08/2026",
    status: "Pendente",
    icone: require("@/assets/images/imgIcon/fone-atividade.png"),
    corIcone: cores.roxo,
  },
  {
    titulo: "Pronúncia do TH",
    subtitulo: "Exercício de fixação",
    professor: "Professor Renato Caetano",
    entrega: "Entrega: 30/07/2026",
    status: "Concluído",
    icone: require("@/assets/images/imgIcon/microfone-atividade.png"),
    corIcone: cores.ciano,
  },
  {
    titulo: "Leitura de crônica",
    subtitulo: "Exercício de fixação",
    professor: "Professor Renato Caetano",
    entrega: "Entrega: 30/07/2026",
    status: "Concluído",
    icone: require("@/assets/images/imgIcon/livro-atividade.png"),
    corIcone: cores.laranja,
  },
];

export default function AtividadesScreen() {
  const [idiomaSelecionado, setIdiomaSelecionado] = useState<string>("Inglês");
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("Todas");

  return (
    <TelaComAbas titulo="Atividades" subtitulo="Faça ou revise suas atividades">
      <Text style={atividadesStyles.secaoTitulo}>Escolha o idioma</Text>

      <View style={atividadesStyles.idiomasLinha}>
        {idiomas.map((idioma) => {
          const selecionado = idioma === idiomaSelecionado;

          return (
            <Pressable
              key={idioma}
              style={[
                atividadesStyles.idiomaPill,
                selecionado && atividadesStyles.idiomaPillSelecionado,
              ]}
              onPress={() => setIdiomaSelecionado(idioma)}
            >
              <Text
                style={[
                  atividadesStyles.idiomaPillTexto,
                  selecionado && atividadesStyles.idiomaPillTextoSelecionado,
                ]}
              >
                {idioma}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={atividadesStyles.filtrosLinha}>
        {filtros.map((filtro) => {
          const selecionado = filtro === filtroSelecionado;

          return (
            <Pressable
              key={filtro}
              style={[
                atividadesStyles.filtroPill,
                selecionado && atividadesStyles.filtroPillSelecionado,
              ]}
              onPress={() => setFiltroSelecionado(filtro)}
            >
              {filtro === "Concluídas" && (
                <Image
                  source={require("@/assets/images/imgIcon/check.png")}
                  style={[
                    atividadesStyles.filtroPillIcone,
                    selecionado && atividadesStyles.filtroPillIconeSelecionado,
                  ]}
                />
              )}
              <Text
                style={[
                  atividadesStyles.filtroPillTexto,
                  selecionado && atividadesStyles.filtroPillTextoSelecionado,
                ]}
              >
                {filtro}
              </Text>
            </Pressable>
          );
        })}

        <Pressable style={atividadesStyles.btnFiltroIcone}>
          <Image
            source={require("@/assets/images/imgIcon/filtro-azul.png")}
            style={atividadesStyles.iconeFiltro}
          />
        </Pressable>
      </View>

      <View style={atividadesStyles.cardProgresso}>
        <CircularProgress
          porcentagem={50}
          tamanho={72}
          espessura={7}
          corProgresso={cores.azul}
          corTrilha={cores.cinza}
        >
          <Text style={atividadesStyles.progressoNumero}>5/10</Text>
          <Text style={atividadesStyles.progressoLegendaAnel}>concluídas</Text>
        </CircularProgress>

        <View style={atividadesStyles.progressoColuna}>
          <Text style={atividadesStyles.progressoTitulo}>
            Progresso geral das atividades
          </Text>
          <Text style={atividadesStyles.progressoSubtitulo}>Continue evoluindo!</Text>
          <BarraProgresso porcentagem={50} cor={cores.verde} />
        </View>
      </View>

      <Text style={atividadesStyles.secaoTitulo}>Suas atividades</Text>

      {atividades.map((atividade) => (
        <View key={atividade.titulo} style={atividadesStyles.atividadeCard}>
          <View
            style={[
              atividadesStyles.atividadeIconeBox,
              { backgroundColor: `${atividade.corIcone}22` },
            ]}
          >
            <Image
              source={atividade.icone}
              style={atividadesStyles.atividadeIcone}
              resizeMode="contain"
            />
          </View>

          <View style={atividadesStyles.atividadeCorpo}>
            <View style={atividadesStyles.atividadeTopo}>
              <View style={{ flex: 1 }}>
                <Text style={atividadesStyles.atividadeTitulo}>{atividade.titulo}</Text>
                <Text style={atividadesStyles.atividadeSubtitulo}>
                  {atividade.subtitulo}
                </Text>
              </View>

              <View
                style={[
                  atividadesStyles.statusBadge,
                  { backgroundColor: `${statusCores[atividade.status]}22` },
                ]}
              >
                <Text
                  style={[
                    atividadesStyles.statusBadgeTexto,
                    { color: statusCores[atividade.status] },
                  ]}
                >
                  {atividade.status}
                </Text>
              </View>
            </View>

            <View style={atividadesStyles.atividadeLinhaInfo}>
              <Image
                source={require("@/assets/images/imgIcon/professor.png")}
                style={atividadesStyles.atividadeLinhaIcone}
              />
              <Text style={atividadesStyles.atividadeLinhaTexto}>
                {atividade.professor}
              </Text>
            </View>

            <View style={atividadesStyles.atividadeLinhaInfo}>
              <Image
                source={require("@/assets/images/imgIcon/calendario-azul.png")}
                style={atividadesStyles.atividadeLinhaIcone}
              />
              <Text style={atividadesStyles.atividadeLinhaTexto}>
                {atividade.entrega}
              </Text>
            </View>

            <View style={atividadesStyles.atividadeRodape}>
              <Pressable style={atividadesStyles.btnAbrir}>
                <Text style={atividadesStyles.txtBtnAbrir}>Abrir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </TelaComAbas>
  );
}
