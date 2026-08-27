import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CentralNotificacoesModal from "@/components/central-notificacoes-modal";
import TabBarInferior from "@/components/tab-bar-inferior";
import telaPadraoStyles from "@/styles/telaPadraoStyles";

type TelaComAbasProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

export default function TelaComAbas({ titulo, subtitulo, children }: TelaComAbasProps) {
  const [modalNotificacoesVisivel, setModalNotificacoesVisivel] = useState(false);

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
            onPress={() => setModalNotificacoesVisivel(true)}
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

      <CentralNotificacoesModal
        visible={modalNotificacoesVisivel}
        onClose={() => setModalNotificacoesVisivel(false)}
      />
    </SafeAreaView>
  );
}
