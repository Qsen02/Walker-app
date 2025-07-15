import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { loginStyles } from "./LoginStyles";

export default function Login() {
	const { theme } = useUserThemeContext();

	return (
		<SafeAreaView
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				globalStyles.formWrapper,
                loginStyles.wrapper
			]}
		>
			<View style={globalStyles.inputWrapper}>
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					Username
				</Text>
				<TextInput
					value=""
					style={[
						theme == "light"
							? globalStyles.whiteThemeDark
							: globalStyles.darkThemeLight,
						globalStyles.input,
					]}
				/>
			</View>
			<View style={globalStyles.inputWrapper}>
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					Password
				</Text>
				<TextInput
					value=""
					style={[
						theme == "light"
							? globalStyles.whiteThemeDark
							: globalStyles.darkThemeLight,
						globalStyles.input,
					]}
				/>
			</View>
			<TouchableOpacity style={globalStyles.button}>
				<Text style={globalStyles.buttonText}>SUBMIT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
