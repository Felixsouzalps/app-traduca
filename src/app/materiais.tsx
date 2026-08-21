import { router } from "expo-router";
import { useState } from "react";

import { Image, Pressable, Text, View } from "react-native";

import TelaComAbas from "@/components/tela-com-abas";
import cursoStyles from "@/styles/cursoStyles";
import materiaisStyles from "@/styles/materiaisStyles";

const filtros = ["Todas", "PDF", "Áudios", "Vídeos"] as const;

const materiais = [
  {
    titulo: "Apostila de inglês",
    subtitulo: "Pronúncia de verbos",
    tamanho: "2.4 MB",
    icone: require("@/assets/images/imgIcon/arquivo.png"),
    acao: "visualizar" as const,
  },
  {
    titulo: "Audio - exercício de fala",
    subtitulo: "Prática guiada | 12 min",
    tamanho: "7.1 MB",
    icone: require("@/assets/images/imgIcon/audio.png"),
    acao: "play" as const,
  },
  {
    titulo: "Videoaulas - verbos frasais",
    subtitulo: "Aula complementar | 8 min",
    tamanho: "44 MB",
    icone: require("@/assets/images/imgIcon/videoaula.png"),
    acao: "play" as const,
  },
];

export default function MateriaisScreen() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("Todas");

  return (
    <TelaComAbas titulo="Materiais" subtitulo="Utilize os materiais de apoio">
      <View style={cursoStyles.abasLinha}>
        <Pressable style={cursoStyles.abaItem} onPress={() => router.navigate("/curso")}>
          <Text style={cursoStyles.abaItemTexto}>Curso</Text>
        </Pressable>

        <View style={[cursoStyles.abaItem, cursoStyles.abaItemSelecionada]}>
          <Text style={[cursoStyles.abaItemTexto, cursoStyles.abaItemTextoSelecionada]}>
            Materiais
          </Text>
        </View>
      </View>

      <Pressable style={materiaisStyles.seletorModulo}>
        <Text style={materiaisStyles.seletorModuloTexto}>
          03 - Módulo de conversação
        </Text>
        <Image
          source={require("@/assets/images/imgIcon/voltar-azul.png")}
          style={materiaisStyles.seletorModuloIcone}
        />
      </Pressable>

      <View style={materiaisStyles.filtrosLinha}>
        {filtros.map((filtro) => {
          const selecionado = filtro === filtroSelecionado;

          return (
            <Pressable
              key={filtro}
              style={[
                materiaisStyles.filtroPill,
                selecionado && materiaisStyles.filtroPillSelecionado,
              ]}
              onPress={() => setFiltroSelecionado(filtro)}
            >
              <Text
                style={[
                  materiaisStyles.filtroPillTexto,
                  selecionado && materiaisStyles.filtroPillTextoSelecionado,
                ]}
              >
                {filtro}
              </Text>
            </Pressable>
          );
        })}

        <Pressable style={materiaisStyles.btnBusca}>
          <Image
            source={require("@/assets/images/imgIcon/buscar.png")}
            style={materiaisStyles.iconeBusca}
          />
        </Pressable>
      </View>

      <Text style={materiaisStyles.secaoTitulo}>Materiais de Apoio</Text>

      {materiais.map((material) => (
        <View key={material.titulo} style={materiaisStyles.materialCard}>
          <View style={materiaisStyles.materialIconeBox}>
            <Image
              source={material.icone}
              style={materiaisStyles.materialIcone}
              resizeMode="contain"
            />
          </View>

          <View style={materiaisStyles.materialCorpo}>
            <Text style={materiaisStyles.materialTitulo}>{material.titulo}</Text>
            <Text style={materiaisStyles.materialSubtitulo}>{material.subtitulo}</Text>
            <Text style={materiaisStyles.materialTamanho}>{material.tamanho}</Text>
          </View>

          <View style={materiaisStyles.materialAcoes}>
            <Pressable>
              <Image
                source={
                  material.acao === "visualizar"
                    ? require("@/assets/images/imgIcon/visualizar-azul.png")
                    : require("@/assets/images/imgIcon/play.png")
                }
                style={materiaisStyles.materialAcaoIcone}
              />
            </Pressable>
            <Pressable>
              <Image
                source={require("@/assets/images/imgIcon/download-azul.png")}
                style={materiaisStyles.materialAcaoIcone}
              />
            </Pressable>
          </View>
        </View>
      ))}

      <View style={materiaisStyles.placeholder}>
        <Text style={materiaisStyles.placeholderTexto}>
          Espere o professor disponibilizar mais materiais
        </Text>
      </View>
    </TelaComAbas>
  );
}
