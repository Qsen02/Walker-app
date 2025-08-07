import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
	darkThemeLight: {
		backgroundColor: "rgb(60,60,60)",
		color: "white",
	},
	darkThemeNormal: {
		backgroundColor: "rgb(40,40,40)",
		color: "white",
	},
	darkThemeDarker: {
		backgroundColor: "rgb(20,20,20)",
		color: "white",
	},
	whiteThemeLighter: {
		backgroundColor: "white",
		color: "black",
	},
	whiteThemeNormal: {
		backgroundColor: "rgb(240,240,240)",
		color: "black",
	},
	whiteThemeDark: {
		backgroundColor: "rgb(220,220,220)",
		color: "black",
	},
	formWrapper: {
		width: "90%",
		textAlign: "center",
		fontSize: 16,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
	},
	inputWrapper: {
		width: "90%",
		display: "flex",
		flexDirection: "column",
		gap: 10,
		alignItems: "center",
	},
	input: {
		width: "100%",
		borderRadius: 10,
		paddingLeft: 10,
		fontSize: 14,
	},
	button: {
		paddingLeft: 20,
		paddingTop: 10,
		paddingRight: 20,
		paddingBottom: 10,
		backgroundColor: "rgba(6, 173, 0, 1)",
		borderRadius: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	errors: {
		fontSize: 14,
		color: "red",
		textAlign: "center",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		width: "90%",
		padding: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		fontSize: 16,
		gap: 20,
		borderRadius: 15,
	},
	modalText: {
		textAlign: "center",
	},
	confirmModalText: {
		textAlign: "center",
		fontSize: 20,
	},
	confirmModalButtons: {
		display: "flex",
		flexDirection: "row",
		gap: 30,
		justifyContent: "center",
	},
	spinner: {
		zIndex: 1000,
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%)",
	},
	errorContainer: {
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "85%",
		width: "95%",
		padding: 20,
		borderRadius: 15,
	},
	errorText: {
		textAlign: "center",
		fontSize: 20,
	},
	sliderContainer: {
		width: "95%",
		height: 30,
		borderRadius: 20,
		overflow: "hidden",
	},
	slider: {
		backgroundColor: "rgba(6, 173, 0, 1)",
		height: "100%",
	},
	arrowButton: {
		marginTop:50,
        marginLeft:30,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignSelf: "flex-start",
	},
});
