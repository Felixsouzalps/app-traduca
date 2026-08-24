import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const personalizarStyles = StyleSheet.create({
  wheelContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  hexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  hexInput: {
    flex: 1,
    height: 42,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: cores.cinza,
    borderRadius: 24,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: cores.preto,
  },

  hexInputAtivo: {
    borderColor: cores.azul,
    backgroundColor: `${cores.azul}10`,
  },

  btnAplicar: {
    height: 48,
    backgroundColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  btnAplicarPressed: {
    opacity: 0.8,
  },

  txtAplicar: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.branco,
  },

  divisor: {
    height: 1,
    backgroundColor: cores.cinza,
    marginBottom: 20,
  },

  presetsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  presetItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 18,
  },

  presetCirculoWrapper: {
    position: "relative",
  },

  presetCirculo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: cores.cinza,
  },

  presetCirculoSelecionado: {
    borderColor: cores.azul,
  },

  presetMetade: {
    width: "100%",
    height: "50%",
  },

  presetBadge: {
    position: "absolute",
    top: -4,
    left: -4,
    width: 20,
    height: 20,
  },

  btnSalvar: {
    height: 50,
    backgroundColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  btnSalvarPressed: {
    opacity: 0.8,
  },

  txtSalvar: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.branco,
  },
});

export default personalizarStyles;
