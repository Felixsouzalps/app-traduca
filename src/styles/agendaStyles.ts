import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const agendaStyles = StyleSheet.create({
  // Card de destaque (próxima aula)
  cardDestaque: {
    backgroundColor: cores.azul,
    borderRadius: 20,
    padding: 16,
  },

  cardDestaqueTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardDestaqueLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.branco,
  },

  duracaoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.azulClaro,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  duracaoBadgeIcone: {
    width: 12,
    height: 12,
    tintColor: cores.branco,
    marginRight: 4,
  },

  duracaoBadgeTexto: {
    fontSize: 11,
    color: cores.branco,
  },

  cardDestaqueCorpo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  cardDestaqueTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: cores.branco,
  },

  cardDestaqueLinhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  cardDestaqueLinhaIcone: {
    width: 13,
    height: 13,
    tintColor: cores.branco,
    marginRight: 6,
  },

  cardDestaqueLinhaTexto: {
    fontSize: 12,
    color: cores.branco,
  },

  cardDestaqueBotoes: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },

  btnEntrar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
    borderRadius: 12,
    height: 42,
  },

  iconeBtnEntrar: {
    width: 12,
    height: 12,
    tintColor: cores.branco,
    marginRight: 8,
  },

  txtBtnEntrar: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.branco,
  },

  btnReagendar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.azulClaro,
    borderWidth: 1,
    borderColor: cores.branco,
    borderRadius: 12,
    height: 42,
  },

  iconeBtnReagendar: {
    width: 12,
    height: 12,
    tintColor: cores.branco,
    marginRight: 8,
  },

  txtBtnReagendar: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.branco,
  },

  // Seções com título + link
  secaoTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },

  secaoTituloEsquerda: {
    flexDirection: "row",
    alignItems: "center",
  },

  secaoTituloIcone: {
    width: 18,
    height: 18,
    tintColor: cores.preto,
    marginRight: 8,
  },

  secaoTituloTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.preto,
  },

  secaoLink: {
    fontSize: 13,
    color: cores.azul,
  },

  // Tira de dias do calendário
  semanaLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  diaItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
  },

  diaItemSelecionado: {
    backgroundColor: cores.azul,
  },

  diaAbreviacao: {
    fontSize: 11,
    color: cores.cinzaEscuro,
    marginBottom: 6,
  },

  diaAbreviacaoSelecionada: {
    color: cores.branco,
  },

  diaNumero: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.preto,
  },

  diaNumeroSelecionado: {
    color: cores.branco,
  },

  // Filtros (segmented control)
  filtrosLinha: {
    flexDirection: "row",
    marginTop: 20,
    gap: 8,
  },

  filtroPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  filtroPillSelecionado: {
    backgroundColor: cores.azul,
    borderColor: cores.azul,
  },

  filtroPillIcone: {
    width: 13,
    height: 13,
    tintColor: cores.branco,
    marginRight: 6,
  },

  filtroPillTexto: {
    fontSize: 12,
    color: cores.cinzaEscuro,
  },

  filtroPillTextoSelecionado: {
    color: cores.branco,
    fontWeight: "bold",
  },

  // Lista de aulas do dia
  aulaCard: {
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },

  aulaCardTopo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  aulaCardCabecalho: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  aulaCardTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.preto,
  },

  aulaCardSala: {
    fontSize: 11,
    color: cores.azul,
  },

  aulaCardLinhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  aulaCardLinhaIcone: {
    width: 12,
    height: 12,
    tintColor: cores.cinzaEscuro,
    marginRight: 6,
  },

  aulaCardLinhaTexto: {
    fontSize: 12,
    color: cores.cinzaEscuro,
  },

  aulaCardBotoes: {
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 56,
    gap: 10,
  },

  btnEntrarPequeno: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
    borderRadius: 10,
    height: 36,
  },

  txtBtnEntrarPequeno: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.branco,
  },

  btnReagendarPequeno: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: cores.azul,
    borderRadius: 10,
    height: 36,
  },

  txtBtnReagendarPequeno: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.azul,
  },
});

export default agendaStyles;
