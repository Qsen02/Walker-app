import { View,Text } from "react-native";
import { homeStyles } from "./HomeStyles";

export default function HomeScreen(){
    return (
        <View style={homeStyles.container}>
            <Text>Home works!</Text>
        </View>
    )
}