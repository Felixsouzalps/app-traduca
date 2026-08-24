import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const modalIphoneStyle = StyleSheet.create({
  sobrepor: {
    flex: 1,
    backgroundColor: cores.preto80,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  conteudo: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: cores.branco,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  logo: {
    width: 150,
    height: 90,
    alignSelf: "center",
    marginBottom: 8,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 13,
    color: cores.cinzaEscuro,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  passo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  passoIconeBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: `${cores.azul}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  passoTexto: {
    flex: 1,
    fontSize: 13,
    color: cores.preto,
    lineHeight: 18,
  },

  textoPronto: {
    fontSize: 13,
    color: cores.cinzaEscuro,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 18,
  },

  btnEntendi: {
    height: 50,
    backgroundColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  btnEntendiPressed: {
    opacity: 0.8,
  },

  txtEntendi: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.branco,
  },

  btnFechar: {
    height: 50,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  btnFecharPressed: {
    opacity: 0.7,
  },

  txtFechar: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.azul,
  },
});

export default modalIphoneStyle;
