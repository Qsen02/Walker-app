import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import HomeScreen from "../../screens/home/Home";
import Register from "../../screens/register/Register";
import RegistrationWrapper from "../../screens/registration_wrapper/RegistrationWrapper";

export default function AuthGate() {
	const { userState } = useUserThemeContext();
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userState ? (
				<Stack.Screen name="Home" component={HomeScreen} />
			) : (
				<Stack.Screen name="RegistrationWrapper" component={RegistrationWrapper} />
			)}
		</Stack.Navigator>
	);
}
