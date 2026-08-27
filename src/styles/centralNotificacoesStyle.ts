import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const centralNotificacoesStyle = StyleSheet.create({
  sobrepor: {
    flex: 1,
    backgroundColor: cores.preto80,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  conteudo: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: cores.branco,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 20,
  },

  btnFechar: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: cores.azul,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  btnFecharPressed: {
    opacity: 0.8,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    marginBottom: 18,
  },

  item: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: cores.azul,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },

  itemIconeBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: `${cores.azul}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  itemIcone: {
    width: 19,
    height: 19,
  },

  itemCorpo: {
    flex: 1,
  },

  itemTitulo: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.preto,
    marginBottom: 3,
  },

  itemRodape: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  itemDescricao: {
    flex: 1,
    fontSize: 11,
    color: cores.cinzaEscuro,
    lineHeight: 15,
    marginRight: 8,
  },

  itemHorario: {
    fontSize: 10,
    fontWeight: "bold",
    color: cores.azul,
  },

  btnMarcarLida: {
    height: 46,
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  btnMarcarLidaPressed: {
    opacity: 0.7,
  },

  txtMarcarLida: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.azul,
  },
});

export default centralNotificacoesStyle;
