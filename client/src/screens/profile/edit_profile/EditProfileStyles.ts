import { StyleSheet } from "react-native";

export const editProfileStyles=StyleSheet.create({
    title:{
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center"
    },
    buttonWrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:30
    },
    error:{
        color:"red",
        fontSize:16,
        textAlign:"center",
        marginTop:-10,
        marginBottom:-10
    }
})