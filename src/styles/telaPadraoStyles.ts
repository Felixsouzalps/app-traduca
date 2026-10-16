
import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const telaPadraoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  btnVoltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: cores.azul,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeVoltar: {
    width: 18,
    height: 18,
  },

  tituloCabecalhoColuna: {
    flex: 1,
    marginHorizontal: 12,
  },

  tituloCabecalho: {
    fontSize: 16,
    fontWeight: "bold",
  },

  subtituloCabecalho: {
    fontSize: 12,
    marginTop: 2,
  },

  btnNotificacao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeNotificacao: {
    width: 20,
    height: 20,
  },

  vazioContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  vazioIcone: {
    width: 64,
    height: 64,
    tintColor: cores.azul,
    opacity: 0.4,
    marginBottom: 16,
  },

  vazioTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },

  vazioSubtexto: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
});

export default telaPadraoStyles;
