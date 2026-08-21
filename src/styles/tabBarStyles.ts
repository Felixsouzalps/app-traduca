import { StyleSheet } from "react-native";
import { cores } from "./variaveis";

const tabBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: cores.azul,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    width: 22,
    height: 22,
    marginBottom: 4,
  },

  legenda: {
    fontSize: 11,
    color: cores.branco,
  },

  legendaAtiva: {
    color: cores.vermelho,
    fontWeight: "bold",
  },
});

export default tabBarStyles;
