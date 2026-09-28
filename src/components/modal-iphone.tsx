import { Image, Modal, Pressable, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import modalIphoneStyle from "@/styles/modalIphoneStyle";
import { cores } from "@/styles/variaveis";

type ModalIphoneProps = {
  visible: boolean;
  onClose: () => void;
};

function IconeCompass() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={cores.azul} strokeWidth={1.5} />
      <Path d="M15 9L12.8 12.8L9 15L11.2 11.2L15 9Z" fill={cores.azul} />
    </Svg>
  );
}

function IconeCompartilhar() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 15V3M12 3L8 7M12 3L16 7"
        stroke={cores.azul}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V12"
        stroke={cores.azul}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function IconeAdicionar() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={4} width={16} height={16} rx={4} stroke={cores.azul} strokeWidth={1.5} />
      <Path
        d="M12 8V16M8 12H16"
        stroke={cores.azul}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const passos = [
  { texto: "Abra esta página no Safari", icone: <IconeCompass /> },
  { texto: "Toque no ícone de compartilhar", icone: <IconeCompartilhar /> },
  { texto: 'Escolha "Adicionar à Tela de Início"', icone: <IconeAdicionar /> },
  { texto: 'Toque em "Adicionar" para finalizar', icone: <IconeAdicionar /> },
];

export default function ModalIphone({ visible, onClose }: ModalIphoneProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={modalIphoneStyle.sobrepor}>
        <View style={modalIphoneStyle.conteudo}>
          <Image
            source={require("@/assets/images/imgIcon/logo-traducaapp.png")}
            style={modalIphoneStyle.logo}
            resizeMode="contain"
          />

          <Text style={modalIphoneStyle.titulo}>Como instalar no iPhone</Text>
          <Text style={modalIphoneStyle.subtitulo}>
            Para adicionar o app à tela inicial do seu iPhone, siga os passos abaixo
          </Text>

          {passos.map((passo, indice) => (
            <View key={passo.texto} style={modalIphoneStyle.passo}>
              <View style={modalIphoneStyle.passoIconeBox}>{passo.icone}</View>
              <Text style={modalIphoneStyle.passoTexto}>
                {indice + 1}. {passo.texto}
              </Text>
            </View>
          ))}

          <Text style={modalIphoneStyle.textoPronto}>
            Pronto! O aplicativo fica disponível na sua tela inicial.
          </Text>

          <Pressable
            style={({ pressed }) => [
              modalIphoneStyle.btnEntendi,
              pressed && modalIphoneStyle.btnEntendiPressed,
            ]}
            onPress={onClose}
          >
            <Text style={modalIphoneStyle.txtEntendi}>Entendi</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              modalIphoneStyle.btnFechar,
              pressed && modalIphoneStyle.btnFecharPressed,
            ]}
            onPress={onClose}
          >
            <Text style={modalIphoneStyle.txtFechar}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
