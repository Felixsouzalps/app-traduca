import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const atividadesStyles = StyleSheet.create({
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.preto,
    marginBottom: 12,
  },

  // Seletor de idioma (pills)
  idiomasLinha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  idiomaPill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: cores.azul,
  },

  idiomaPillSelecionado: {
    backgroundColor: cores.azul,
  },

  idiomaPillTexto: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.azul,
  },

  idiomaPillTextoSelecionado: {
    color: cores.branco,
  },

  // Filtros
  filtrosLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
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
    tintColor: cores.cinzaEscuro,
    marginRight: 6,
  },

  filtroPillIconeSelecionado: {
    tintColor: cores.branco,
  },

  filtroPillTexto: {
    fontSize: 12,
    color: cores.cinzaEscuro,
  },

  filtroPillTextoSelecionado: {
    color: cores.branco,
    fontWeight: "bold",
  },

  btnFiltroIcone: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.cinza,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeFiltro: {
    width: 16,
    height: 16,
  },

  // Card de progresso geral
  cardProgresso: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  progressoNumero: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.azul,
  },

  progressoLegendaAnel: {
    fontSize: 10,
    color: cores.cinzaEscuro,
  },

  progressoColuna: {
    flex: 1,
    marginLeft: 16,
  },

  progressoTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.preto,
  },

  progressoSubtitulo: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    marginBottom: 10,
  },

  // Lista de atividades
  atividadeCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },

  atividadeIconeBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  atividadeIcone: {
    width: 22,
    height: 22,
  },

  atividadeCorpo: {
    flex: 1,
  },

  atividadeTopo: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  atividadeTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.preto,
  },

  atividadeSubtitulo: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    marginTop: 2,
  },

  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  statusBadgeTexto: {
    fontSize: 11,
    fontWeight: "bold",
  },

  atividadeLinhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  atividadeLinhaIcone: {
    width: 12,
    height: 12,
    tintColor: cores.cinzaEscuro,
    marginRight: 6,
  },

  atividadeLinhaTexto: {
    fontSize: 12,
    color: cores.cinzaEscuro,
  },

  atividadeRodape: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  btnAbrir: {
    backgroundColor: cores.azul,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  txtBtnAbrir: {
    fontSize: 13,
    fontWeight: "bold",
    color: cores.branco,
  },
});

export default atividadesStyles;
