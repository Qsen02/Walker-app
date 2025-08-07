import { Text, TouchableOpacity, View } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Register from "../register/Register";
import { registrationWrapperStyles } from "./RegistrationWrapperStyles";
import { useState } from "react";
import Login from "../login/Login";

export default function RegistrationWrapper() {
	const { theme, language } = useUserThemeContext();
	const [activeScreen, setActiveScreen] = useState<"Login" | "Register">(
		"Register"
	);

	return (
		<View
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				registrationWrapperStyles.wrapper,
			]}
		>
			<View style={registrationWrapperStyles.header}>
				<TouchableOpacity
					onPress={() => setActiveScreen("Login")}
					style={[
						activeScreen == "Login"
							? registrationWrapperStyles.touched
							: "",
						registrationWrapperStyles.button,
					]}
				>
					<Text
						style={[
							activeScreen == "Login"
								? registrationWrapperStyles.touched
								: "",
							registrationWrapperStyles.buttonText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{language == "english" ? "Login" : "Вход"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setActiveScreen("Register")}
					style={[
						activeScreen == "Register"
							? registrationWrapperStyles.touched
							: "",
						registrationWrapperStyles.button,
					]}
				>
					<Text
						style={[
							activeScreen == "Register"
								? registrationWrapperStyles.touched
								: "",
							registrationWrapperStyles.buttonText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{language == "english" ? "Register" : "Регистрация"}
					</Text>
				</TouchableOpacity>
			</View>
			{activeScreen == "Login" ? <Login /> : <Register />}
		</View>
	);
}
