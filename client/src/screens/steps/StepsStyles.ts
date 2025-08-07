import { StyleSheet } from "react-native";

export const stepsStyles = StyleSheet.create({
	wrapper: {
		marginTop: 20,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 20,
        alignItems:"center"
	},
	title: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	titleText: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	},
	stepsContainer: {
		width: "95%",
		height: "80%",
	},
	stepsContentContainer: {
        width:"100%",
		display: "flex",
		flexDirection: "column",
		gap: 20,
		alignItems: "center",
	},
});
