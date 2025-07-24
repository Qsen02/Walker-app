import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetOneUser } from "../../hooks/useUser";

export default function HomeScreen() {
	const {userState, removeUser, theme, changeTheme } = useUserThemeContext();
	const {user,loading,error}=useGetOneUser(null,userState?._id);

	async function onLogout() {
		if (removeUser) {
			await removeUser();
		}
	}

	function onChangeTheme() {
		if (changeTheme) {
			changeTheme();
		}
	}

	return (
		<View
			style={[
				homeStyles.container,
				theme == "light"
					? globalStyles.whiteThemeLighter
					: globalStyles.darkThemeDarker,
			]}
		>
			<View style={homeStyles.buttonsContainer}>
				<Icon
					name="circle-half-stroke"
					color={theme == "light" ? "black" : "white"}
					size={24}
					onPress={onChangeTheme}
				></Icon>
				<TouchableOpacity
					onPress={onLogout}
					style={globalStyles.button}
				>
					<Text style={globalStyles.buttonText}>LOGOUT</Text>
				</TouchableOpacity>
			</View>
			<Text
				style={[
					theme == "light" ? { color: "black" } : { color: "white" },
					homeStyles.title
				]}
			>
				Walker app
			</Text>
		</View>
	);
}
