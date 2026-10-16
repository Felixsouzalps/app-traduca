
import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

export type TemaNotificacoes = "claro" | "escuro";

export function criarStylesNotificacoes(tema: TemaNotificacoes) {
  const escuro = tema === "escuro";

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
      padding: 16,
    },
    conteudo: {
      width: "100%",
      maxWidth: 480,
      maxHeight: "85%",
      flexDirection: "row",
      backgroundColor: fundo,
      borderRadius: 10,
      overflow: "hidden",
      elevation: 10,
    },
    capa: {
      width: 22,
      backgroundColor: cores.azul,
      alignItems: "center",
      paddingTop: 22,
      gap: 16,
    },
    furo: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: fundo,
    },
    corpo: { flex: 1, minWidth: 0 },
    cabecalho: {
      padding: 18,
      borderBottomWidth: 1,
      borderBottomColor: borda,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tituloArea: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    iconeTitulo: {
      width: 19,
      height: 19,
      tintColor: escuro ? cores.textoEscuro : cores.azul,
    },
    titulo: {
      color: texto,
      fontSize: 20,
      fontWeight: "700",
    },
    subtitulo: {
      color: textoSecundario,
      fontSize: 12,
      marginTop: 3,
    },
    botaoFechar: {
      width: 28,
      height: 28,
      alignItems: "center",
    },
    fechar: {
      color: textoSecundario,
      fontSize: 28,
      lineHeight: 26,
    },
    abas: {
      paddingHorizontal: 10,
      paddingTop: 8,
      backgroundColor: cartao,
      gap: 4,
    },
    aba: {
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
    abaAtiva: { backgroundColor: fundo },
    textoAba: {
      color: textoSecundario,
      fontSize: 12,
      fontWeight: "600",
    },
    textoAbaAtiva: { color: escuro ? cores.textoEscuro : cores.azul },
    lista: { backgroundColor: fundo },
    notificacao: {
      flexDirection: "row",
      gap: 10,
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: borda,
    },
    notificacaoNova: {
      backgroundColor: cartao,
    },
    marcaNova: {
      position: "absolute",
      left: 4,
      top: 11,
      color: cores.vermelho,
      fontSize: 18,
    },
    iconeContainer: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: escuro ? "#303747" : "#E4E8FF",
      alignItems: "center",
      justifyContent: "center",
    },
    iconeNotificacao: {
      width: 17,
      height: 17,
      tintColor: escuro ? cores.textoEscuro : cores.azul,
    },
    textos: { flex: 1 },
    linhaTitulo: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 6,
    },
    tituloNotificacao: {
      flex: 1,
      color: texto,
      fontSize: 14,
      fontWeight: "700",
    },
    descricao: {
      color: textoSecundario,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 4,
    },
    horario: {
      color: textoSecundario,
      fontSize: 11,
    },
    acoes: {
      flexDirection: "row",
      gap: 14,
      marginTop: 8,
    },
    acaoPrincipal: {
      color: escuro ? cores.textoEscuro : cores.azul,
      fontSize: 12,
      fontWeight: "600",
    },
    acao: {
      color: textoSecundario,
      fontSize: 12,
    },
    rodape: {
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: borda,
      backgroundColor: cartao,
      alignItems: "flex-end",
    },
    textoBotao: {
      color: escuro ? cores.textoEscuro : cores.azul,
      fontSize: 12,
      fontWeight: "700",
    },
    botaoDesabilitado: { opacity: 0.4 },
    vazio: {
      padding: 48,
      alignItems: "center",
    },
    vazioTitulo: {
      color: texto,
      fontSize: 16,
      fontWeight: "700",
    },
    vazioTexto: {
      color: textoSecundario,
      fontSize: 13,
      marginTop: 4,
    },
  });
}
