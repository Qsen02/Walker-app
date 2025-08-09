import { StyleSheet } from "react-native";

export const waterItemStyles = StyleSheet.create({
	wrapper: {
		width: "90%",
		padding: 10,
		borderRadius: 15,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
    waterWrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:15
    },
	text: {
		textAlign: "center",
		fontSize: 18,
	},
});
