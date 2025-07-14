import { StyleSheet } from "react-native";

export const registrationWrapperStyles=StyleSheet.create({
    wrapper:{
        width:"70%",
        height:"70%",
        marginTop:120,
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:15,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    header:{
        width:"100%",
        padding:20,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:70,
        borderBottomColor:"grey",
        borderBottomWidth:1,
        borderStyle:"solid"
    },
    touched:{
        backgroundColor:"lightgrey",
        color:"white"
    },
    button:{
        flexBasis:"45%",
        width:"100%",
        height:"100%"
    }
})