import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
	wrapper: {
		marginTop: 20,
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 20,
		alignItems: "center",
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	text: {
		fontSize: 18,
	},
	themeWrapper: {
		width: "95%",
		borderRadius: 15,
		padding: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 120,
		alignItems: "center",
	},
	languageWapper: {
		width: "95%",
		borderRadius: 15,
		padding: 10,
		display: "flex",
		flexDirection: "column",
		gap: 20,
		alignItems: "center",
        overflow:"hidden"
	},
    languageButtonsWrapper:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-evenly",
		gap: 50,
		alignItems: "center",
    },
    languageButton:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:"grey",
        borderRadius:10
    }
});
