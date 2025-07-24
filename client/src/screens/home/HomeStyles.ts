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
	contentContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
	},
	contentItemWrapper: {
		width: "100%",
		display:"flex",
		flexDirection:"column",
		alignItems:"center"
	},
	contentItems: {
		width: "95%",
		padding: 10,
		borderRadius: 15,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
	contenteItemText:{
		fontSize:20
	}
});
