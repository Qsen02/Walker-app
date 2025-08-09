import { StyleSheet } from "react-native";

export const profileStyles=StyleSheet.create({
    wrapper:{
        width:"93%",
        marginTop:20,
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:15,
        padding:20,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:20
    },
    text:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    buttonWrapper:{
        paddingTop:20,
        borderTopWidth:1,
        borderTopColor:"darkgray",
        borderStyle:"solid",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:30
    }
})