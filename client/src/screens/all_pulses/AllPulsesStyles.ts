import { StyleSheet } from "react-native";

export const pulsesStyles = StyleSheet.create({
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
    pulsesContainer: {
        width: "95%",
        height: "80%",
    },
    pulsesContentContainer: {
        width:"100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
    },
});
