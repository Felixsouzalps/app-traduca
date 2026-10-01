import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import cursoStyles from "@/styles/cursoStyles";
import { cores } from "@/styles/variaveis";

type Aba = "curso" | "materiais";

type AbasCursoProps = {
  abaSelecionada: Aba;
  onSelecionar: (aba: Aba) => void;
};

export default function AbasCurso({ abaSelecionada, onSelecionar }: AbasCursoProps) {
  const progresso = useSharedValue(abaSelecionada === "materiais" ? 0 : 1);

  useEffect(() => {
    progresso.value = withTiming(abaSelecionada === "materiais" ? 1 : 0, {
      duration: 350,
      easing: Easing.out(Easing.cubic),
    });
  }, [abaSelecionada, progresso]);

  const fundoCurso = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progresso.value, [0, 1], [cores.azul, "transparent"]),
  }));
  const fundoMateriais = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progresso.value, [0, 1], ["transparent", cores.azul]),
  }));
  const textoCurso = useAnimatedStyle(() => ({
    color: interpolateColor(progresso.value, [0, 1], [cores.branco, cores.azul]),
  }));
  const textoMateriais = useAnimatedStyle(() => ({
    color: interpolateColor(progresso.value, [0, 1], [cores.azul, cores.branco]),
  }));

  return (
    <View style={cursoStyles.abasLinha}>
      <Pressable
        style={cursoStyles.abaItem}
        onPress={() => onSelecionar("curso")}
      >
        <Animated.View pointerEvents="none" style={[cursoStyles.abaFundoAnimado, fundoCurso]} />
        <Animated.Text style={[cursoStyles.abaItemTexto, textoCurso]}>Curso</Animated.Text>
      </Pressable>

      <Pressable
        style={cursoStyles.abaItem}
        onPress={() => onSelecionar("materiais")}
      >
        <Animated.View pointerEvents="none" style={[cursoStyles.abaFundoAnimado, fundoMateriais]} />
        <Animated.Text style={[cursoStyles.abaItemTexto, textoMateriais]}>Materiais</Animated.Text>
      </Pressable>
    </View>
  );
}
