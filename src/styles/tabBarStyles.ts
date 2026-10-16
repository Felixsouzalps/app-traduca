
import { StyleSheet } from "react-native";

const tabBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
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
  },

  legendaAtiva: {
    fontWeight: "bold",
  },
});

export default tabBarStyles;
