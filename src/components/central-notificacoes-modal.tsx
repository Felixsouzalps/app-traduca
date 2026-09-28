import { Image, Modal, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import centralNotificacoesStyle from "@/styles/centralNotificacoesStyle";
import { cores } from "@/styles/variaveis";

type CentralNotificacoesModalProps = {
  visible: boolean;
  onClose: () => void;
};

function IconeFechar() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 5L19 19M19 5L5 19"
        stroke={cores.branco}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const notificacoes = [
  {
    titulo: "Nova atividade disponível",
    descricao: "Você recebeu uma nova atividade de inglês.",
    horario: "Hoje, 10:30",
    icone: require("@/assets/images/imgIcon/sino-azul.png"),
  },
  {
    titulo: "Aula atualizada",
    descricao: "A aula de amanhã foi atualizada pelo professor.",
    horario: "Ontem, 16:20",
    icone: require("@/assets/images/imgIcon/calendario-azul.png"),
  },
];

export default function CentralNotificacoesModal({
  visible,
  onClose,
}: CentralNotificacoesModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={centralNotificacoesStyle.sobrepor}>
        <View style={centralNotificacoesStyle.conteudo}>
          <Pressable
            style={({ pressed }) => [
              centralNotificacoesStyle.btnFechar,
              pressed && centralNotificacoesStyle.btnFecharPressed,
            ]}
            onPress={onClose}
          >
            <IconeFechar />
          </Pressable>

          <Text style={centralNotificacoesStyle.titulo}>Central de notificações</Text>

          {notificacoes.map((notificacao) => (
            <View key={notificacao.titulo} style={centralNotificacoesStyle.item}>
              <View style={centralNotificacoesStyle.itemIconeBox}>
                <Image
                  source={notificacao.icone}
                  style={centralNotificacoesStyle.itemIcone}
                  resizeMode="contain"
                />
              </View>

              <View style={centralNotificacoesStyle.itemCorpo}>
                <Text style={centralNotificacoesStyle.itemTitulo}>
                  {notificacao.titulo}
                </Text>

                <View style={centralNotificacoesStyle.itemRodape}>
                  <Text style={centralNotificacoesStyle.itemDescricao}>
                    {notificacao.descricao}
                  </Text>
                  <Text style={centralNotificacoesStyle.itemHorario}>
                    {notificacao.horario}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          <Pressable
            style={({ pressed }) => [
              centralNotificacoesStyle.btnMarcarLida,
              pressed && centralNotificacoesStyle.btnMarcarLidaPressed,
            ]}
            onPress={onClose}
          >
            <Text style={centralNotificacoesStyle.txtMarcarLida}>Marcar como lida</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
