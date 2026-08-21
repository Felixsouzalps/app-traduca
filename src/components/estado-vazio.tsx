import { Image, ImageSourcePropType, Text, View } from "react-native";

import telaPadraoStyles from "@/styles/telaPadraoStyles";

type EstadoVazioProps = {
  icone: ImageSourcePropType;
  texto: string;
  subtexto?: string;
};

export default function EstadoVazio({ icone, texto, subtexto }: EstadoVazioProps) {
  return (
    <View style={telaPadraoStyles.vazioContainer}>
      <Image source={icone} style={telaPadraoStyles.vazioIcone} />
      <Text style={telaPadraoStyles.vazioTexto}>{texto}</Text>
      {subtexto ? (
        <Text style={telaPadraoStyles.vazioSubtexto}>{subtexto}</Text>
      ) : null}
    </View>
  );
}
