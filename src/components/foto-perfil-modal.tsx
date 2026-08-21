import { Image, Modal, Pressable, Text, View } from "react-native";

import fotoPerfilStyle from "@/styles/fotoPerfilStyle";

type FotoPerfilModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function FotoPerfilModal({ visible, onClose }: FotoPerfilModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={fotoPerfilStyle.sobrepor}>
        <View style={fotoPerfilStyle.conteudo}>
          <Pressable style={fotoPerfilStyle.btnFechar} onPress={onClose}>
            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={fotoPerfilStyle.iconeFechar}
            />
          </Pressable>

          <View style={fotoPerfilStyle.iconeBox}>
            <Image
              source={require("@/assets/images/imgIcon/usuario.png")}
              style={fotoPerfilStyle.icone}
            />
          </View>

          <Text style={fotoPerfilStyle.titulo}>Mude sua foto de perfil</Text>

          <Pressable
            style={[fotoPerfilStyle.btn, fotoPerfilStyle.btnPreenchido]}
            onPress={onClose}
          >
            <Image
              source={require("@/assets/images/imgIcon/camera.png")}
              style={fotoPerfilStyle.btnIcone}
            />
            <Text style={fotoPerfilStyle.btnTextoPreenchido}>Tirar foto</Text>
          </Pressable>

          <Pressable
            style={[fotoPerfilStyle.btn, fotoPerfilStyle.btnPreenchido, { marginBottom: 0 }]}
            onPress={onClose}
          >
            <Image
              source={require("@/assets/images/imgIcon/foto-usuario.png")}
              style={fotoPerfilStyle.btnIcone}
            />
            <Text style={fotoPerfilStyle.btnTextoPreenchido}>Escolher na galeria</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
