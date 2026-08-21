import { Text, View } from "react-native";

import { cores } from "@/styles/variaveis";

type BarraProgressoProps = {
  porcentagem: number;
  cor: string;
};

export default function BarraProgresso({ porcentagem, cor }: BarraProgressoProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          height: 8,
          borderRadius: 4,
          backgroundColor: cores.cinza,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${porcentagem}%`,
            height: "100%",
            borderRadius: 4,
            backgroundColor: cor,
          }}
        />
      </View>

      <Text style={{ marginLeft: 8, fontSize: 12, fontWeight: "bold", color: cor }}>
        {porcentagem}%
      </Text>
    </View>
  );
}
