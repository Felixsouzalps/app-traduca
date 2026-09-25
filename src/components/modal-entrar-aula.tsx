import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { cores } from "@/styles/variaveis";

type Props = { visible: boolean; carregando: boolean; onClose: () => void; onConfirmar: () => void };

export default function ModalEntrarAula({ visible, carregando, onClose, onConfirmar }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "#00000080", justifyContent: "center", padding: 24 }}>
        <View style={{ backgroundColor: cores.branco, borderRadius: 20, padding: 24, alignItems: "center" }}>
          {carregando ? <>
            <ActivityIndicator size="large" color={cores.azul} />
            <Text style={{ marginTop: 16, color: cores.preto, fontSize: 16, fontWeight: "bold" }}>Preparando sua aula...</Text>
            <Text style={{ marginTop: 8, color: cores.cinzaEscuro, textAlign: "center" }}>Você será redirecionado para fora do app.</Text>
          </> : <>
            <Text style={{ color: cores.preto, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Entrar na aula</Text>
            <Text style={{ color: cores.cinzaEscuro, textAlign: "center", marginTop: 10, lineHeight: 20 }}>Você será redirecionado para fora do aplicativo para acessar a aula. Deseja continuar?</Text>
            <View style={{ flexDirection: "row", gap: 10, width: "100%", marginTop: 22 }}>
              <Pressable onPress={onClose} style={{ flex: 1, height: 42, borderRadius: 12, borderWidth: 1, borderColor: cores.cinza, alignItems: "center", justifyContent: "center" }}><Text style={{ color: cores.cinzaEscuro, fontWeight: "bold" }}>Cancelar</Text></Pressable>
              <Pressable onPress={onConfirmar} style={{ flex: 1, height: 42, borderRadius: 12, backgroundColor: cores.azul, alignItems: "center", justifyContent: "center" }}><Text style={{ color: cores.branco, fontWeight: "bold" }}>Continuar</Text></Pressable>
            </View>
          </>}
        </View>
      </View>
    </Modal>
  );
}
