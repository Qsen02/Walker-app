import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: 40,
		gap: 20,
	},
	buttonsContainer: {
		width: "100%",
		paddingRight: 30,
		display: "flex",
		flexDirection: "row",
		gap: 20,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
	},
});
