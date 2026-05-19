import { StyleSheet } from "react-native";

export const pulseItemStyles = StyleSheet.create({
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
    bpmValue: {
        fontSize: 18,
    }
});
