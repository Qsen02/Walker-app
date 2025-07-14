import { Text, TouchableOpacity, View } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../types/RoutingTable";
import Register from "../register/Register";
import { registrationWrapperStyles } from "./RegistrationWrapperStyles";
import { useState } from "react";

export default function RegistrationWrapper() {
	const { theme } = useUserThemeContext();
	const Stack = createNativeStackNavigator();
	const naviagtion = useNavigation<NavigationType>();
	const [isRegisterTouched, setIsRegisterTouched] = useState(true);
	const [isLoginTouched, setIsLoginTouched] = useState(false);

	function touchLogin() {
		if (!isLoginTouched) {
			setIsLoginTouched(true);
			setIsRegisterTouched(false);
		} else {
			setIsLoginTouched(false);
			setIsRegisterTouched(true);
		}
		naviagtion.navigate("Login");
	}

	function touchRegister() {
		if (!isRegisterTouched) {
			setIsLoginTouched(false);
			setIsRegisterTouched(true);
		} else {
			setIsLoginTouched(true);
			setIsRegisterTouched(false);
		}
		naviagtion.navigate("Register");
	}

	return (
		<View
			style={[
				theme == "light"
					? globalStyles.whiteThemeLighter
					: globalStyles.darkThemeDarker,
				registrationWrapperStyles.wrapper,
			]}
		>
			<View style={registrationWrapperStyles.header}>
				<TouchableOpacity
					onPress={touchLogin}
					style={[
						isLoginTouched ? registrationWrapperStyles.touched : "",
						registrationWrapperStyles.button,
					]}
				>
					<Text
						style={
							isLoginTouched
								? registrationWrapperStyles.touched
								: ""
						}
					>
						Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={touchRegister}
					style={[
						isRegisterTouched
							? registrationWrapperStyles.touched
							: "",
						registrationWrapperStyles.button,
					]}
				>
					<Text
						style={
							isRegisterTouched
								? registrationWrapperStyles.touched
								: ""
						}
					>
						Register
					</Text>
				</TouchableOpacity>
			</View>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName="Register"
			>
				<Stack.Screen name="Register" component={Register} />
			</Stack.Navigator>
		</View>
	);
}
