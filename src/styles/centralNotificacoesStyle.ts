
import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

export type TemaCentralNotificacoes = "light" | "dark";

export function criarCentralNotificacoesStyle(
  tema: TemaCentralNotificacoes,
) {
  const escuro = tema === "dark";

  const fundo = escuro ? cores.fundoEscuro : cores.fundoClaro;
  const cartao = escuro ? cores.cartaoEscuro : cores.cartaoClaro;
  const borda = escuro ? cores.bordaEscura : cores.bordaClara;
  const texto = escuro ? cores.textoEscuro : cores.textoClaro;
  const textoSecundario = escuro
    ? cores.textoSecundarioEscuro
    : cores.cinzaEscuro;

  return StyleSheet.create({
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
      backgroundColor: fundo,
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
      color: texto,
      textAlign: "center",
      marginBottom: 18,
    },
    item: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: cores.azul,
      backgroundColor: cartao,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
    },
    itemIconeBox: {
      width: 38,
      height: 38,
      borderRadius: 10,
      backgroundColor: escuro ? "#303747" : "#E4E8FF",
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
      color: texto,
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
      color: textoSecundario,
      lineHeight: 15,
      marginRight: 8,
    },
    itemHorario: {
      fontSize: 10,
      fontWeight: "bold",
      color: escuro ? cores.textoEscuro : cores.azul,
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
      color: escuro ? cores.textoEscuro : cores.azul,
    },
    lista: {
      maxHeight: 380,
      marginBottom: 8,
    },
    itemLido: {
      borderColor: borda,
      opacity: 0.7,
    },
    pontoNaoLido: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: cores.vermelho,
    },
    vazio: {
      fontSize: 13,
      color: textoSecundario,
      textAlign: "center",
      marginVertical: 24,
    },
    btnDesabilitado: {
      opacity: 0.4,
    },
    contador: {
      position: "absolute",
      top: -2,
      right: -2,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      paddingHorizontal: 4,
      backgroundColor: cores.vermelho,
      alignItems: "center",
      justifyContent: "center",
    },
    contadorTexto: {
      fontSize: 10,
      fontWeight: "bold",
      color: cores.branco,
    },
  });
}
