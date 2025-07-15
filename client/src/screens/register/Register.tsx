import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
	const { theme } = useUserThemeContext();

	return (
		<SafeAreaView
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				globalStyles.formWrapper,
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
					Email
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
			<View style={globalStyles.inputWrapper}>
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					Repeat password
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
