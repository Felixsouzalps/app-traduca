import { Modal, Pressable, Text, View } from "react-native";
import { cores } from "@/styles/variaveis";

type Props = { visible: boolean; onClose: () => void; onPermitir: () => void; titulo?: string; mensagem?: string; textoAcao?: string };

export default function ModalPermissaoInstalacao({ visible, onClose, onPermitir, titulo = "Permitir instalação?", mensagem = "O aplicativo precisa da sua permissão para continuar o processo de instalação na tela inicial.", textoAcao = "Permitir" }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "#00000080", justifyContent: "center", padding: 24 }}>
        <View style={{ backgroundColor: cores.branco, borderRadius: 20, padding: 24 }}>
          <Text style={{ color: cores.preto, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>{titulo}</Text>
          <Text style={{ color: cores.cinzaEscuro, fontSize: 14, lineHeight: 20, textAlign: "center", marginTop: 10 }}>{mensagem}</Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
            <Pressable onPress={onClose} style={{ flex: 1, height: 42, borderRadius: 12, borderWidth: 1, borderColor: cores.cinza, alignItems: "center", justifyContent: "center" }}><Text style={{ color: cores.cinzaEscuro, fontWeight: "bold" }}>Cancelar</Text></Pressable>
            <Pressable onPress={onPermitir} style={{ flex: 1, height: 42, borderRadius: 12, backgroundColor: cores.azul, alignItems: "center", justifyContent: "center" }}><Text style={{ color: cores.branco, fontWeight: "bold" }}>{textoAcao}</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
