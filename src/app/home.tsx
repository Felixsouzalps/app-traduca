import { useState } from "react";
import { router } from "expo-router";
<<<<<<< HEAD
=======
import { useState } from "react";

>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CentralNotificacoesModal from "@/components/central-notificacoes-modal";
import homeStyles from "@/styles/homeStyles";
import NotificacoesModal from "@/components/notificacaoModal";

const menuItens = [
  {
    label: "Aulas",
    icone: require("@/assets/images/imgIcon/aula-azul.png"),
    rota: "/aulas",
  },
  {
    label: "Agenda",
    icone: require("@/assets/images/imgIcon/calendario-azul.png"),
    rota: "/agenda",
  },
  {
    label: "Atividades",
    icone: require("@/assets/images/imgIcon/atividades-azul.png"),
    rota: "/atividades",
  },
  {
    label: "Curso",
    icone: require("@/assets/images/imgIcon/curso-azul.png"),
    rota: "/curso",
  },
  {
    label: "Materiais",
    icone: require("@/assets/images/imgIcon/mochila-azul.png"),
    rota: "/materiais",
  },
  {
    label: "Config",
    icone: require("@/assets/images/imgIcon/config-azul.png"),
    rota: "/config",
  },
] as const;

export default function HomeScreen() {
<<<<<<< HEAD
  const [notificacoesVisible, setNotificacoesVisible] = useState(false);
=======
  const [modalNotificacoesVisivel, setModalNotificacoesVisivel] = useState(false);
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a

  return (
    <SafeAreaView style={homeStyles.container} edges={["top"]}>
      <View style={homeStyles.cabecalho}>
        <View style={homeStyles.cabecalhoEsquerda}>
          <View style={homeStyles.avatar}>
            <Image
              source={require("@/assets/images/imgIcon/usuario.png")}
              style={homeStyles.avatarIcone}
            />
          </View>

          <View>
            <Text style={homeStyles.boasVindas}>Bem-vindo</Text>
            <Text style={homeStyles.nomeAluno}>Aluno!</Text>
          </View>
        </View>

        <Pressable
          style={homeStyles.btnNotificacao}
<<<<<<< HEAD
          onPress={() => setNotificacoesVisible(true)}
=======
          onPress={() => setModalNotificacoesVisivel(true)}
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
        >
          <Image
            source={require("@/assets/images/imgIcon/sino-azul.png")}
            style={homeStyles.iconeNotificacao}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={homeStyles.grid}>
        {menuItens.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              homeStyles.card,
              pressed && homeStyles.cardPressed,
            ]}
            onPress={() => router.navigate(item.rota as never)}
          >
            <Image source={item.icone} style={homeStyles.cardIcone} />

            <Text style={homeStyles.cardTexto}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

<<<<<<< HEAD
      <NotificacoesModal
        visible={notificacoesVisible}
        onClose={() => setNotificacoesVisible(false)}
=======
      <CentralNotificacoesModal
        visible={modalNotificacoesVisivel}
        onClose={() => setModalNotificacoesVisivel(false)}
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
      />
    </SafeAreaView>
  );
}