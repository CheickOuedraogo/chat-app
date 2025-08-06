import { StyleSheet } from "react-native";
export default StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  inputView: {
    backgroundColor: "gray",
    padding: 5,
    width: "100%"
  },
  view: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 5,
    outline: "none",
    borderColor: "transparent",
    backgroundColor: "white",
  },

  sendView: {
    padding: 5,
    minHeight: 45,
    maxHeight: 200,
    width: "100%",
    alignItems: "flex-end",
    marginVertical: 2,
    marginHorizontal: 5,
  },
  receivedView: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 2,
    marginHorizontal: 5,
  },
  sendText: {
    backgroundColor: "rgba(0,0,200,0.7)",
    color: "white",
    borderRadius: 5,
    width: "80%",
    padding: 5,
    marginHorizontal: 10,
  },
  receivedText: {
    backgroundColor: "rgba(0,200,0,0.7)",
    color: "white",
    borderRadius: 5,
    width: "80%",
    padding: 5,
    marginHorizontal: 10,
  },
  metaDataView: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
  metaDataText: {
    marginHorizontal: 5,
  },
});
