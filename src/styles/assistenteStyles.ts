import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const assistenteStyles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.preto,
    justifyContent: "center",
    padding: 18,
  },

  cartao: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    backgroundColor: cores.branco,
    borderRadius: 26,
    overflow: "hidden",
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.azul,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  avatarBox: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: cores.azul,
  },

  avatarSelo: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: cores.verde,
    borderWidth: 2,
    borderColor: cores.azul,
  },

  cabecalhoTextos: {
    flex: 1,
  },

  cabecalhoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: cores.branco,
  },

  cabecalhoSubtitulo: {
    fontSize: 11,
    color: `${cores.branco}CC`,
    marginTop: 2,
  },

  btnFechar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: `${cores.branco}80`,
    alignItems: "center",
    justifyContent: "center",
  },

  btnFecharPressed: {
    opacity: 0.7,
  },

  iconeFechar: {
    width: 11,
    height: 11,
    tintColor: cores.branco,
    transform: [{ rotate: "-90deg" }],
  },

  corpo: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
  },

  saudacaoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    marginBottom: 8,
  },

  saudacaoTexto: {
    fontSize: 13,
    color: cores.cinzaEscuro,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  saudacaoDestaque: {
    color: cores.vermelho,
    fontWeight: "bold",
  },

  lista: {
    paddingHorizontal: 18,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },

  itemCardPressed: {
    backgroundColor: `${cores.azul}0D`,
    borderColor: cores.azul,
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
  },

  itemSubtitulo: {
    fontSize: 11,
    color: cores.cinzaEscuro,
    marginTop: 2,
  },

  itemSeta: {
    width: 12,
    height: 12,
    tintColor: cores.azul,
    transform: [{ rotate: "180deg" }],
  },

  rodape: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
    gap: 10,
  },

  campoBusca: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 23,
    backgroundColor: `${cores.azul}0D`,
    borderWidth: 1,
    borderColor: cores.cinza,
    paddingHorizontal: 14,
  },

  iconeAnexo: {
    width: 16,
    height: 16,
    tintColor: cores.cinzaEscuro,
    marginRight: 8,
  },

  campoBuscaInput: {
    flex: 1,
    fontSize: 13,
    color: cores.preto,
  },

  btnEnviar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: cores.azul,
    alignItems: "center",
    justifyContent: "center",
  },

  btnEnviarPressed: {
    opacity: 0.85,
  },

  iconeEnviar: {
    width: 18,
    height: 18,
    tintColor: cores.branco,
  },
});

export default assistenteStyles;
