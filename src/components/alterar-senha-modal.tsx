import { useState } from "react";

import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";

import alterarSenhaStyle from "@/styles/alterarSenhaStyle";

type AlterarSenhaModalProps = {
  visible: boolean;
  onClose: () => void;
};

function CampoSenha({ rotulo }: { rotulo: string }) {
  const [verSenha, setVerSenha] = useState(false);

  return (
    <View style={alterarSenhaStyle.campo}>
      <Text style={alterarSenhaStyle.rotulo}>{rotulo}</Text>

      <View style={alterarSenhaStyle.input}>
        <TextInput
          style={alterarSenhaStyle.textInput}
          secureTextEntry={!verSenha}
          placeholderTextColor="#888888"
        />

        <Pressable onPress={() => setVerSenha((atual) => !atual)}>
          <Image
            source={
              verSenha
                ? require("@/assets/images/imgIcon/esconder.png")
                : require("@/assets/images/imgIcon/visualizar-azul.png")
            }
            style={alterarSenhaStyle.iconeMostrarSenha}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default function AlterarSenhaModal({ visible, onClose }: AlterarSenhaModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={alterarSenhaStyle.sobrepor}>
        <View style={alterarSenhaStyle.conteudo}>
          <Pressable style={alterarSenhaStyle.btnFechar} onPress={onClose}>
            <Image
              source={require("@/assets/images/imgIcon/voltar-azul.png")}
              style={alterarSenhaStyle.iconeFechar}
            />
          </Pressable>

          <Text style={alterarSenhaStyle.titulo}>Atualize sua senha</Text>

          <CampoSenha rotulo="Senha atual" />
          <CampoSenha rotulo="Nova senha" />
          <CampoSenha rotulo="Confirmar senha" />

          <Pressable
            style={({ pressed }) => [
              alterarSenhaStyle.btnSalvar,
              pressed && alterarSenhaStyle.btnSalvarPressed,
            ]}
            onPress={onClose}
          >
            <Text style={alterarSenhaStyle.txtSalvar}>Salvar alterações</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
