import { router } from "expo-router";
import { useState } from "react";

import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import assistenteStyles from "@/styles/assistenteStyles";

const opcoes = [
  {
    titulo: "Minhas aulas",
    subtitulo: "Ver aulas agendadas",
    icone: require("@/assets/images/imgIcon/aula-azul.png"),
    rota: "/aulas",
  },
  {
    titulo: "Consultar horários",
    subtitulo: "Disponibilidade semanal",
    icone: require("@/assets/images/imgIcon/relogio-azul.png"),
    rota: "/agenda",
  },
  {
    titulo: "Materiais de estudo",
    subtitulo: "PDFs, áudios e exercícios",
    icone: require("@/assets/images/imgIcon/mochila-azul.png"),
    rota: "/materiais",
  },
  {
    titulo: "Agendar aula",
    subtitulo: "Escolher data ou fazer reagendamentos",
    icone: require("@/assets/images/imgIcon/calendario-azul.png"),
    rota: "/agenda",
  },
  {
    titulo: "Contatar professor",
    subtitulo: "Enviar mensagem",
    icone: require("@/assets/images/imgIcon/professor.png"),
    rota: null,
  },
] as const;

export default function AssistenteScreen() {
  const [duvida, setDuvida] = useState("");

  return (
    <SafeAreaView style={assistenteStyles.fundo} edges={["top", "bottom"]}>
      <View style={assistenteStyles.cartao}>
        <View style={assistenteStyles.cabecalho}>
          <View style={assistenteStyles.avatarBox}>
            <Text style={assistenteStyles.avatarTexto}>AI</Text>
            <View style={assistenteStyles.avatarSelo} />
          </View>

          <View style={assistenteStyles.cabecalhoTextos}>
            <Text style={assistenteStyles.cabecalhoTitulo}>TraducaAI</Text>
            <Text style={assistenteStyles.cabecalhoSubtitulo}>
              Assistente virtual do Traduca Idiomas
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              assistenteStyles.btnFechar,
              pressed && assistenteStyles.btnFecharPressed,
            ]}
            onPress={() => router.back()}
          >
            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={assistenteStyles.iconeFechar}
            />
          </Pressable>
        </View>

        <View style={assistenteStyles.corpo}>
          <Text style={assistenteStyles.saudacaoTitulo}>
            Olá, Caio! como posso ajudar?
          </Text>
          <Text style={assistenteStyles.saudacaoTexto}>
            Sou a <Text style={assistenteStyles.saudacaoDestaque}>TraducaAI</Text>,
            sua assistente virtual. Como posso ajudar com suas aulas hoje?
          </Text>
        </View>

        <View style={assistenteStyles.lista}>
          {opcoes.map((opcao) => (
            <Pressable
              key={opcao.titulo}
              style={({ pressed }) => [
                assistenteStyles.itemCard,
                pressed && assistenteStyles.itemCardPressed,
              ]}
              onPress={() => opcao.rota && router.navigate(opcao.rota as never)}
            >
              <View style={assistenteStyles.itemIconeBox}>
                <Image
                  source={opcao.icone}
                  style={assistenteStyles.itemIcone}
                  resizeMode="contain"
                />
              </View>

              <View style={assistenteStyles.itemCorpo}>
                <Text style={assistenteStyles.itemTitulo}>{opcao.titulo}</Text>
                <Text style={assistenteStyles.itemSubtitulo}>{opcao.subtitulo}</Text>
              </View>

              <Image
                source={require("@/assets/images/imgIcon/voltar-azul.png")}
                style={assistenteStyles.itemSeta}
              />
            </Pressable>
          ))}
        </View>

        <View style={assistenteStyles.rodape}>
          <View style={assistenteStyles.campoBusca}>
            <Image
              source={require("@/assets/images/imgIcon/arquivo.png")}
              style={assistenteStyles.iconeAnexo}
            />
            <TextInput
              value={duvida}
              onChangeText={setDuvida}
              placeholder="Escreva sua dúvida"
              placeholderTextColor="#88888899"
              style={assistenteStyles.campoBuscaInput}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              assistenteStyles.btnEnviar,
              pressed && assistenteStyles.btnEnviarPressed,
            ]}
            onPress={() => setDuvida("")}
          >
            <Image
              source={require("@/assets/images/imgIcon/enviar.png")}
              style={assistenteStyles.iconeEnviar}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
