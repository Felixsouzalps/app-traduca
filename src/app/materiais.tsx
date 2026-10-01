import { router } from "expo-router";
import { useRef, useState } from "react";

import { Animated, Image, Pressable, Text, TextInput, View } from "react-native";

import TelaComAbas from "@/components/tela-com-abas";
import AbasCurso from "@/components/abas-curso";
import ModalPermissaoInstalacao from "@/components/modal-permissao-instalacao";
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
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [materialSelecionado, setMaterialSelecionado] = useState<string | null>(null);
  const larguraBusca = useRef(new Animated.Value(36)).current;

  const fecharBusca = () => {
    setBuscaAberta(false);
    setTermoBusca("");
    Animated.timing(larguraBusca, {
      toValue: 36,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const alternarBusca = () => {
    const abrir = !buscaAberta;
    if (!abrir) {
      fecharBusca();
      return;
    }

    setBuscaAberta(true);
    Animated.timing(larguraBusca, {
      toValue: 180,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const materiaisFiltrados = materiais.filter((material) => {
    const termo = termoBusca.trim().toLowerCase();
    return !termo || `${material.titulo} ${material.subtitulo}`.toLowerCase().includes(termo);
  });

  return (
    <TelaComAbas titulo="Materiais" subtitulo="Utilize os materiais de apoio">
      <AbasCurso abaSelecionada="materiais" onSelecionar={(aba) => aba === "curso" && router.navigate("/curso")} />

      <Pressable style={materiaisStyles.seletorModulo}>
        <Text style={materiaisStyles.seletorModuloTexto}>
          03 - Módulo de conversação
        </Text>
        <Image
          source={require("@/assets/images/imgIcon/voltar-azul.png")}
          style={materiaisStyles.seletorModuloIcone}
        />
      </Pressable>

      <View style={[materiaisStyles.filtrosLinha, { position: "relative" }]}>
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
              onBlur={fecharBusca}
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

      <Text style={materiaisStyles.secaoTitulo}>Materiais de Apoio</Text>

      {materiaisFiltrados.map((material) => (
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
            <Pressable onPress={() => setMaterialSelecionado(material.titulo)}>
              <Image
                source={require("@/assets/images/imgIcon/download-azul.png")}
                style={materiaisStyles.materialAcaoIcone}
              />
            </Pressable>
          </View>
        </View>
      ))}

      <ModalPermissaoInstalacao
        visible={materialSelecionado !== null}
        onClose={() => setMaterialSelecionado(null)}
        onPermitir={() => setMaterialSelecionado(null)}
        titulo="Permitir download?"
        mensagem="O aplicativo precisa da sua permissão para baixar este material no dispositivo."
        textoAcao="Baixar"
      />

      {materiaisFiltrados.length === 0 && (
        <Text style={materiaisStyles.placeholderTexto}>Nenhum material encontrado</Text>
      )}

      <View style={materiaisStyles.placeholder}>
        <Text style={materiaisStyles.placeholderTexto}>
          Espere o professor disponibilizar mais materiais
        </Text>
      </View>
    </TelaComAbas>
  );
}
