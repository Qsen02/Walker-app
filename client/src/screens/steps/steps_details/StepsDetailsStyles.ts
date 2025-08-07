import { StyleSheet } from "react-native";

export const stepsDetailsStyles=StyleSheet.create({
    wrapper:{
        marginTop:30,
        marginLeft:"auto",
        marginRight:"auto",
        padding:20,
        width:"95%",
        borderRadius:15,
        display:"flex",
        flexDirection:"column",
        gap:20,
        alignItems:"center"
    },
    titleWrapper:{
        display:"flex",
        flexDirection:"column",
        gap:10,
        alignItems:"center"
    },
    titleText:{
        fontSize:18,
        textAlign:"center"
    }
})