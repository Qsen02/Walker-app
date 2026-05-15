import { StyleSheet } from "react-native";

export const pulseMeasureStyles = StyleSheet.create({
	wrapper: {
		width: "95%",
		padding: 20,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 30,
		borderRadius: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 30,
	},
	buttonWrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
	},
	measureWrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
    measureWrapperText: {
        fontSize: 18,
        textAlign:"center"
    }
});
