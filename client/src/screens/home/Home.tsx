import { View, Text } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";

export default function HomeScreen() {
	const { userState } = useUserThemeContext();

	return (
		<View style={homeStyles.container}>
			<Text>Home works!</Text>
			<Text>{userState?.username}</Text>
		</View>
	);
}
