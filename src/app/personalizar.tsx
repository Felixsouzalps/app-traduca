import { router } from "expo-router";
import { useMemo, useState } from "react";

import { Image, Pressable, Text, TextInput, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import TelaComAbas from "@/components/tela-com-abas";
import personalizarStyles from "@/styles/personalizarStyles";
import { cores } from "@/styles/variaveis";

function hslParaHex(h: number, s: number, l: number) {
  const sFracao = s / 100;
  const lFracao = l / 100;
  const a = sFracao * Math.min(lFracao, 1 - lFracao);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const cor = lFracao - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * cor)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function coordenadaPolar(centro: number, raio: number, anguloGraus: number) {
  const rad = ((anguloGraus - 90) * Math.PI) / 180;
  return { x: centro + raio * Math.cos(rad), y: centro + raio * Math.sin(rad) };
}

const CENTRO = 100;
const RAIO = 90;
const FATIAS = 48;

const presets = [
  { superior: cores.vermelho, inferior: cores.azul },
  { superior: cores.azulClaro, inferior: cores.laranja },
  { superior: "#F7B4C0", inferior: cores.vermelho },
  { superior: "#4DA8FF", inferior: cores.azul },
  { superior: cores.roxo, inferior: cores.ciano },
  { superior: cores.preto, inferior: cores.vermelho },
];

export default function PersonalizarScreen() {
  const [hexCores, setHexCores] = useState(["#FFFFFF", "#FFFFFF", "#FFFFFF"]);
  const [campoAtivo, setCampoAtivo] = useState(0);
  const [corPreview, setCorPreview] = useState<string | null>(null);
  const [anguloPreview, setAnguloPreview] = useState<number | null>(null);
  const [presetSelecionado, setPresetSelecionado] = useState<number | null>(0);

  const fatias = useMemo(() => {
    const passo = 360 / FATIAS;
    return Array.from({ length: FATIAS }, (_, indice) => {
      const anguloInicial = indice * passo;
      const anguloFinal = anguloInicial + passo;
      const anguloMedio = anguloInicial + passo / 2;
      const p0 = coordenadaPolar(CENTRO, RAIO, anguloInicial);
      const p1 = coordenadaPolar(CENTRO, RAIO, anguloFinal);

      return {
        angulo: anguloMedio,
        cor: hslParaHex(anguloMedio, 90, 55),
        d: `M ${CENTRO} ${CENTRO} L ${p0.x} ${p0.y} A ${RAIO} ${RAIO} 0 0 1 ${p1.x} ${p1.y} Z`,
      };
    });
  }, []);

  const marcador = anguloPreview !== null ? coordenadaPolar(CENTRO, RAIO * 0.78, anguloPreview) : null;

  function selecionarCampo(indice: number) {
    setCampoAtivo(indice);
  }

  function editarHex(indice: number, valor: string) {
    setHexCores((atual) => atual.map((cor, i) => (i === indice ? valor : cor)));
  }

  function aplicarCorSelecionada() {
    if (!corPreview) return;

    setHexCores((atual) => atual.map((cor, i) => (i === campoAtivo ? corPreview : cor)));
    setPresetSelecionado(null);
    setCorPreview(null);
    setAnguloPreview(null);
  }

  function selecionarPreset(indice: number) {
    const preset = presets[indice];

    setPresetSelecionado(indice);
    setHexCores((atual) => [preset.superior.toUpperCase(), preset.inferior.toUpperCase(), atual[2]]);
    setCorPreview(null);
    setAnguloPreview(null);
  }

  return (
    <TelaComAbas titulo="Personalizar" subtitulo="Deixe a Traduca vestir suas cores">
      <View style={personalizarStyles.wheelContainer}>
        <Svg width={200} height={200} viewBox="0 0 200 200">
          {fatias.map((fatia) => (
            <Path
              key={fatia.angulo}
              d={fatia.d}
              fill={fatia.cor}
              onPress={() => {
                setCorPreview(hslParaHex(fatia.angulo, 90, 55));
                setAnguloPreview(fatia.angulo);
              }}
            />
          ))}

          {marcador && (
            <Circle
              cx={marcador.x}
              cy={marcador.y}
              r={8}
              fill={corPreview ?? cores.branco}
              stroke={cores.branco}
              strokeWidth={2}
            />
          )}
        </Svg>
      </View>

      <View style={personalizarStyles.hexRow}>
        {hexCores.map((cor, indice) => (
          <TextInput
            key={indice}
            value={cor}
            onChangeText={(valor) => editarHex(indice, valor)}
            onFocus={() => selecionarCampo(indice)}
            autoCapitalize="characters"
            maxLength={7}
            style={[
              personalizarStyles.hexInput,
              campoAtivo === indice && personalizarStyles.hexInputAtivo,
            ]}
          />
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          personalizarStyles.btnAplicar,
          pressed && personalizarStyles.btnAplicarPressed,
        ]}
        onPress={aplicarCorSelecionada}
      >
        <Text style={personalizarStyles.txtAplicar}>Aplicar</Text>
      </Pressable>

      <View style={personalizarStyles.divisor} />

      <View style={personalizarStyles.presetsGrid}>
        {presets.map((preset, indice) => (
          <Pressable
            key={indice}
            style={personalizarStyles.presetItem}
            onPress={() => selecionarPreset(indice)}
          >
            <View style={personalizarStyles.presetCirculoWrapper}>
              <View
                style={[
                  personalizarStyles.presetCirculo,
                  presetSelecionado === indice && personalizarStyles.presetCirculoSelecionado,
                ]}
              >
                <View style={[personalizarStyles.presetMetade, { backgroundColor: preset.superior }]} />
                <View style={[personalizarStyles.presetMetade, { backgroundColor: preset.inferior }]} />
              </View>

              {presetSelecionado === indice && (
                <Image
                  source={require("@/assets/images/imgIcon/check.png")}
                  style={personalizarStyles.presetBadge}
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [
          personalizarStyles.btnSalvar,
          pressed && personalizarStyles.btnSalvarPressed,
        ]}
        onPress={() => router.back()}
      >
        <Text style={personalizarStyles.txtSalvar}>Salvar alterações</Text>
      </Pressable>
    </TelaComAbas>
  );
}
