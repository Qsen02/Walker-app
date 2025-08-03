import { StyleSheet } from "react-native";

export const stepsStyles=StyleSheet.create({
    wrapper:{
        marginTop:50,
        width:"100%",
        display:"flex",
        flexDirection:"column",
        gap:20
    },
    arrowButton:{
        paddingLeft:30,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    title:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    titleText:{
        textAlign:"center",
        fontSize:18,
        fontWeight:"bold"
    }
})