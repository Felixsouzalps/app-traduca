<<<<<<< HEAD
import { router } from "expo-router";
import { useRef, useState } from "react";

import { Animated, Image, Pressable, Text, TextInput, View } from "react-native";
=======
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { ActivityIndicator, Image, Pressable, Text, TextInput, View } from "react-native";
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c

import EstadoVazio from "@/components/estado-vazio";
import TelaComAbas from "@/components/tela-com-abas";
<<<<<<< HEAD
import AbasCurso from "@/components/abas-curso";
import ModalPermissaoInstalacao from "@/components/modal-permissao-instalacao";
=======
import { buscarCursos, buscarMateriais, Material } from "@/services/api";
import { abrirMaterial } from "@/services/arquivos";
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c
import cursoStyles from "@/styles/cursoStyles";
import materiaisStyles from "@/styles/materiaisStyles";
import { cores } from "@/styles/variaveis";

const filtros = ["Todas", "PDF", "Áudios", "Vídeos"] as const;
type Filtro = (typeof filtros)[number];

const EXT_AUDIO = ["mp3", "wav", "m4a", "ogg", "aac", "wma", "flac"];
const EXT_VIDEO = ["mp4", "mov", "avi", "mkv", "webm", "wmv", "m4v"];

type TipoMaterial = "pdf" | "audio" | "video" | "outro";

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
<<<<<<< HEAD
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
=======
  const [filtroSelecionado, setFiltroSelecionado] = useState<Filtro>("Todas");
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [erroArquivo, setErroArquivo] = useState("");
  const [baixando, setBaixando] = useState<number | null>(null);
  const [moduloSelecionado, setModuloSelecionado] = useState<number | null>(null);
  const [mostrarModulos, setMostrarModulos] = useState(false);
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [busca, setBusca] = useState("");

  // Busca os dados toda vez que a tela aparece (inclusive ao voltar para ela),
  // para mostrar materiais novos que o professor cadastrou.
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        try {
          const cursos = await buscarCursos();
          if (cursos.length === 0) {
            setMateriais([]);
            setErro("Você ainda não está matriculado em nenhum curso.");
            return;
          }
          // Mostra os materiais do primeiro curso ativo (mesmo curso da tela Curso).
          setMateriais(await buscarMateriais(cursos[0].id_curso));
          setErro("");
        } catch (e) {
          setErro(e instanceof Error ? e.message : "Não foi possível carregar os materiais.");
        } finally {
          setCarregando(false);
        }
      }
      carregar();
    }, [])
  );

  // Lista de módulos que têm materiais, em ordem.
  const modulos = materiais
    .filter((m, i, lista) => lista.findIndex((x) => x.id_modulo === m.id_modulo) === i)
    .sort((a, b) => a.ordem_modulo - b.ordem_modulo);

  const moduloAtual = modulos.find((m) => m.id_modulo === moduloSelecionado);

  const termo = busca.trim().toLowerCase();
  const materiaisFiltrados = materiais.filter((material) => {
    const tipo = tipoPorFiltro[filtroSelecionado];
    if (tipo && tipoDoMaterial(material) !== tipo) return false;
    if (moduloSelecionado !== null && material.id_modulo !== moduloSelecionado) return false;
    if (termo && !`${material.titulo} ${material.descricao ?? ""}`.toLowerCase().includes(termo)) {
      return false;
    }
    return true;
  });

  async function acessar(material: Material, modo: "ver" | "baixar") {
    setErroArquivo("");
    setBaixando(material.id_material);
    try {
      await abrirMaterial(material, modo);
      // O servidor marca o material como concluído ao baixar.
      setMateriais((lista) =>
        lista.map((m) => (m.id_material === material.id_material ? { ...m, concluido: true } : m))
      );
    } catch (e) {
      setErroArquivo(e instanceof Error ? e.message : "Não foi possível abrir o material.");
    } finally {
      setBaixando(null);
    }
  }
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c

  return (
    <TelaComAbas titulo="Materiais" subtitulo="Utilize os materiais de apoio">
      <AbasCurso abaSelecionada="materiais" onSelecionar={(aba) => aba === "curso" && router.navigate("/curso")} />

      {carregando && <ActivityIndicator size="large" color={cores.azul} />}

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

<<<<<<< HEAD
      <View style={[materiaisStyles.filtrosLinha, { position: "relative" }]}>
=======
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
                  selecionado && materiaisStyles.filtroPillSelecionado,
                ]}
                onPress={() => {
                  setModuloSelecionado(id);
                  setMostrarModulos(false);
                }}
              >
                <Text
                  style={[
                    materiaisStyles.filtroPillTexto,
                    selecionado && materiaisStyles.filtroPillTextoSelecionado,
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

      <View style={materiaisStyles.filtrosLinha}>
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c
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

<<<<<<< HEAD
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
=======
        <Pressable
          style={materiaisStyles.btnBusca}
          onPress={() => {
            setMostrarBusca((atual) => !atual);
            setBusca("");
          }}
        >
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c
          <Image
            source={require("@/assets/images/imgIcon/buscar.png")}
            style={materiaisStyles.iconeBusca}
          />
          </Pressable>
        </Animated.View>
      </View>

      {mostrarBusca && (
        <TextInput
          style={materiaisStyles.campoBusca}
          placeholder="Buscar material..."
          placeholderTextColor="#888888"
          value={busca}
          onChangeText={setBusca}
          autoFocus
        />
      )}

      <Text style={materiaisStyles.secaoTitulo}>Materiais de Apoio</Text>

<<<<<<< HEAD
      {materiaisFiltrados.map((material) => (
        <View key={material.titulo} style={materiaisStyles.materialCard}>
          <View style={materiaisStyles.materialIconeBox}>
            <Image
              source={material.icone}
              style={materiaisStyles.materialIcone}
              resizeMode="contain"
            />
          </View>
=======
      {erroArquivo ? <Text style={materiaisStyles.txtErro}>{erroArquivo}</Text> : null}
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c

      {materiaisFiltrados.map((material) => {
        const tipo = tipoDoMaterial(material);

        return (
          <View key={material.id_material} style={materiaisStyles.materialCard}>
            <View style={materiaisStyles.materialIconeBox}>
              <Image
                source={iconePorTipo[tipo]}
                style={materiaisStyles.materialIcone}
                resizeMode="contain"
              />
<<<<<<< HEAD
            </Pressable>
            <Pressable onPress={() => setMaterialSelecionado(material.titulo)}>
              <Image
                source={require("@/assets/images/imgIcon/download-azul.png")}
                style={materiaisStyles.materialAcaoIcone}
              />
            </Pressable>
=======
            </View>

            <View style={materiaisStyles.materialCorpo}>
              <Text style={materiaisStyles.materialTitulo}>{material.titulo}</Text>
              {material.descricao ? (
                <Text style={materiaisStyles.materialSubtitulo}>{material.descricao}</Text>
              ) : null}
              <Text style={materiaisStyles.materialTamanho}>
                {material.extensao ? material.extensao.toUpperCase() : "Sem arquivo"}
                {material.concluido ? (
                  <Text style={materiaisStyles.materialConcluido}> · Concluído</Text>
                ) : null}
              </Text>
            </View>

            {material.tem_arquivo && (
              <View style={materiaisStyles.materialAcoes}>
                {baixando === material.id_material ? (
                  <ActivityIndicator color={cores.azul} />
                ) : (
                  <>
                    <Pressable onPress={() => acessar(material, "ver")}>
                      <Image
                        source={
                          tipo === "audio" || tipo === "video"
                            ? require("@/assets/images/imgIcon/play.png")
                            : require("@/assets/images/imgIcon/visualizar-azul.png")
                        }
                        style={materiaisStyles.materialAcaoIcone}
                      />
                    </Pressable>
                    <Pressable onPress={() => acessar(material, "baixar")}>
                      <Image
                        source={require("@/assets/images/imgIcon/download-azul.png")}
                        style={materiaisStyles.materialAcaoIcone}
                      />
                    </Pressable>
                  </>
                )}
              </View>
            )}
>>>>>>> d05c4167590cc5908018b103dd92c8035acd053c
          </View>
        );
      })}

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
          {materiaisFiltrados.length === 0
            ? "Nenhum material encontrado. Espere o professor disponibilizar materiais"
            : "Espere o professor disponibilizar mais materiais"}
        </Text>
      </View>
      </>
      )}
    </TelaComAbas>
  );
}
