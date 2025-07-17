import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";

export default function HomeScreen() {
	const { userState,removeUser } = useUserThemeContext();

	async function onLogout(){
		if(removeUser){
			await removeUser();
		}
	}

	return (
		<View style={homeStyles.container}>
			<Text>Home works!</Text>
			<Text>{userState?.username}</Text>
			<TouchableOpacity onPress={onLogout}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
