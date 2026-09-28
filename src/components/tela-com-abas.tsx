import { useState } from "react";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

<<<<<<< HEAD
import NotificacoesModal from "@/components/notificacaoModal";
=======
import CentralNotificacoesModal from "@/components/central-notificacoes-modal";
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
import TabBarInferior from "@/components/tab-bar-inferior";
import telaPadraoStyles from "@/styles/telaPadraoStyles";

type TelaComAbasProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

export default function TelaComAbas({ titulo, subtitulo, children }: TelaComAbasProps) {
<<<<<<< HEAD
  const [notificacoesVisivel, setNotificacoesVisivel] = useState(false);
=======
  const [modalNotificacoesVisivel, setModalNotificacoesVisivel] = useState(false);
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a

  return (
    <SafeAreaView style={telaPadraoStyles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={telaPadraoStyles.conteudo}>
        <View style={telaPadraoStyles.cabecalho}>
          <Pressable style={telaPadraoStyles.btnVoltar} onPress={() => router.back()}>
            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={telaPadraoStyles.iconeVoltar}
            />
          </Pressable>

          <View style={telaPadraoStyles.tituloCabecalhoColuna}>
            <Text style={telaPadraoStyles.tituloCabecalho}>{titulo}</Text>
            {subtitulo ? (
              <Text style={telaPadraoStyles.subtituloCabecalho}>{subtitulo}</Text>
            ) : null}
          </View>

          <Pressable
            style={telaPadraoStyles.btnNotificacao}
<<<<<<< HEAD
            onPress={() => setNotificacoesVisivel(true)}
=======
            onPress={() => setModalNotificacoesVisivel(true)}
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
          >
            <Image
              source={require("@/assets/images/imgIcon/sino-azul.png")}
              style={telaPadraoStyles.iconeNotificacao}
            />
          </Pressable>
        </View>

        {children}
      </ScrollView>

      <TabBarInferior />

<<<<<<< HEAD
      <NotificacoesModal
        visible={notificacoesVisivel}
        onClose={() => setNotificacoesVisivel(false)}
=======
      <CentralNotificacoesModal
        visible={modalNotificacoesVisivel}
        onClose={() => setModalNotificacoesVisivel(false)}
>>>>>>> 12efd0b0311c6053b9f4536ea8d1612ccee6a85a
      />
    </SafeAreaView>
  );
}
