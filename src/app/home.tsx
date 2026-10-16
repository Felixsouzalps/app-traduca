
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SinoNotificacoes from "@/components/sino-notificacoes";
import { useTheme } from "@/hooks/use-theme";
import { fotoAlunoUrl, primeiroNomeAluno } from "@/services/api";
import homeStyles from "@/styles/homeStyles";

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
  const foto = fotoAlunoUrl();
  const tema = useTheme();

  return (
    <SafeAreaView
      style={[homeStyles.container, { backgroundColor: tema.background }]}
      edges={["top"]}
    >
      <View style={[homeStyles.cabecalho, { backgroundColor: tema.backgroundElement }]}>
        <View style={homeStyles.cabecalhoEsquerda}>
          <View style={[homeStyles.avatar, { backgroundColor: tema.background }]}>
            {foto ? (
              <Image
                source={{ uri: foto }}
                style={homeStyles.avatarFoto}
              />
            ) : (
              <Image
                source={require("@/assets/images/imgIcon/usuario.png")}
                style={homeStyles.avatarIcone}
              />
            )}
          </View>

          <View>
            <Text style={[homeStyles.boasVindas, { color: tema.textSecondary }]}>
              Bem-vindo
            </Text>

            <Text style={[homeStyles.nomeAluno, { color: tema.text }]}>
              {primeiroNomeAluno()}!
            </Text>
          </View>
        </View>

        <SinoNotificacoes
          estiloBotao={[homeStyles.btnNotificacao, { backgroundColor: tema.background }]}
          estiloIcone={homeStyles.iconeNotificacao}
        />
      </View>

      <ScrollView style={{ backgroundColor: tema.background }} contentContainerStyle={homeStyles.grid}>
        {menuItens.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              homeStyles.card,
              { backgroundColor: tema.backgroundElement, borderColor: tema.border },
              pressed && { backgroundColor: tema.backgroundSelected },
            ]}
            onPress={() => router.navigate(item.rota as never)}
          >
            <Image
              source={item.icone}
              style={homeStyles.cardIcone}
            />

            <Text style={[homeStyles.cardTexto, { color: tema.text }]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          homeStyles.btnAssistente,
          pressed && homeStyles.btnAssistentePressed,
        ]}
        onPress={() => router.navigate("/assistente")}
      >
        <Text style={homeStyles.btnAssistenteTexto}>
          AI
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
