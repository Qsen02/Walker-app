import { StyleSheet } from "react-native";

export const stepItemStyles = StyleSheet.create({
	itemWrapper: {
		width: "90%",
		alignSelf: "center",
		borderRadius: 15,
		padding: 10,
		display: "flex",
		flexDirection: "column",
		gap: 10,
		alignItems: "center",
	},
	stepsCount: {
		fontSize: 18,
	}
});
