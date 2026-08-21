import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const enviarLinkStyle = StyleSheet.create ({
    sobrepor: {
    flex: 1,
    backgroundColor: cores.preto80,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
 
  conteudo: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
 
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 16,
  },

scroll: {
    marginVertical: 20,
  },
 
  texto: {
    fontSize: 17,
    color: "#888888",
    lineHeight: 20,
    textAlign: "justify",
  },
 
  textoValidade: {
    fontSize: 14,
    color: cores.azul,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
 
  btnEntendi: {
    width: "60%",
    height: 50,
    marginTop: 24,
    backgroundColor: cores.azul,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
 
  btnEntendiPressed: {
    opacity: 0.8,
  },
 
  txtEntendi: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default enviarLinkStyle;