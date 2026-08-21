import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const cursoStyles = StyleSheet.create({
  abasLinha: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: cores.azul,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },

  abaItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
  },

  abaItemSelecionada: {
    backgroundColor: cores.azul,
  },

  abaItemTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.azul,
  },

  abaItemTextoSelecionada: {
    color: cores.branco,
  },

  cardCargaHoraria: {
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  cardCargaHorariaTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cargaHorariaLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.preto,
  },

  cargaHorariaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.cinza,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  cargaHorariaBadgeIcone: {
    width: 13,
    height: 13,
    marginRight: 5,
  },

  cargaHorariaBadgeTexto: {
    fontSize: 12,
    fontWeight: "bold",
    color: cores.azul,
  },

  cargaHorariaResumo: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: cores.preto,
    marginBottom: 12,
  },

  moduloCard: {
    borderWidth: 1,
    borderColor: cores.cinza,
    borderLeftWidth: 4,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  moduloCardConcluido: {
    borderLeftColor: cores.verde,
  },

  moduloCardAtual: {
    borderLeftColor: cores.azul,
  },

  moduloCardBloqueado: {
    borderLeftColor: cores.cinza,
    borderStyle: "dashed",
  },

  moduloTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  moduloTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.preto,
  },

  moduloTituloBloqueado: {
    color: cores.cinzaEscuro,
  },

  moduloTag: {
    fontSize: 11,
    fontWeight: "bold",
    color: cores.azul,
  },

  moduloInfo: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    marginTop: 4,
  },

  moduloStatusLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  moduloStatusIcone: {
    width: 13,
    height: 13,
    marginRight: 6,
  },

  moduloStatusTexto: {
    fontSize: 12,
    fontWeight: "bold",
  },

  moduloBloqueadoTexto: {
    fontSize: 12,
    color: cores.cinzaEscuro,
    fontStyle: "italic",
    marginTop: 8,
  },
});

export default cursoStyles;
