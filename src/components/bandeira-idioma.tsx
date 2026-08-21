import { Image, Text, View } from "react-native";

import { cores } from "@/styles/variaveis";

export type IdiomaId = "ingles" | "portugues" | "italiano";

const bandeiras: Record<IdiomaId, { emoji: string } | { icone: number }> = {
  ingles: { emoji: "🇺🇸" },
  portugues: { emoji: "🇧🇷" },
  italiano: { icone: require("@/assets/images/imgIcon/bandeira-talia.png") },
};

type BandeiraIdiomaProps = {
  idioma: IdiomaId;
  tamanho?: number;
};

export default function BandeiraIdioma({ idioma, tamanho = 44 }: BandeiraIdiomaProps) {
  const dados = bandeiras[idioma];

  return (
    <View
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho / 2,
        backgroundColor: cores.branco,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {"icone" in dados ? (
        <Image
          source={dados.icone}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ fontSize: tamanho * 0.5 }}>{dados.emoji}</Text>
      )}
    </View>
  );
}
