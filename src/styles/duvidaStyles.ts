import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const duvidaStyles = StyleSheet.create({
  inputAssunto: {
    height: 48,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: cores.preto,
    marginBottom: 14,
  },

  inputMensagem: {
    minHeight: 170,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: cores.preto,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  btnEnviar: {
    height: 50,
    backgroundColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  btnEnviarPressed: {
    opacity: 0.8,
  },

  txtEnviar: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.branco,
  },

  cardContato: {
    borderWidth: 1,
    borderColor: cores.azul,
    borderRadius: 16,
    padding: 16,
  },

  contatoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.azul,
    marginBottom: 14,
  },

  contatoBloco: {
    marginBottom: 14,
  },

  contatoRotulo: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    marginBottom: 2,
  },

  contatoValor: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.azul,
    textDecorationLine: "underline",
  },

  redesSociaisLinha: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  iconeRedeSocial: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: cores.azul,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default duvidaStyles;
