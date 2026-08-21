import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type CircularProgressProps = {
  porcentagem: number;
  tamanho?: number;
  espessura?: number;
  corProgresso: string;
  corTrilha: string;
  children?: React.ReactNode;
};

export default function CircularProgress({
  porcentagem,
  tamanho = 80,
  espessura = 8,
  corProgresso,
  corTrilha,
  children,
}: CircularProgressProps) {
  const raio = (tamanho - espessura) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = (porcentagem / 100) * circunferencia;

  return (
    <View style={{ width: tamanho, height: tamanho, alignItems: "center", justifyContent: "center" }}>
      <Svg width={tamanho} height={tamanho} style={{ position: "absolute" }}>
        <Circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          stroke={corTrilha}
          strokeWidth={espessura}
          fill="none"
        />
        <Circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          stroke={corProgresso}
          strokeWidth={espessura}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circunferencia}, ${circunferencia}`}
          strokeDashoffset={circunferencia - preenchido}
          transform={`rotate(-90 ${tamanho / 2} ${tamanho / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}
