import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import HomeScreen from "../../screens/home/Home";
import RegistrationWrapper from "../../screens/registration_wrapper/RegistrationWrapper";
import { globalStyles } from "../../../globalStyles";
import Steps from "../../screens/steps/Steps";

export default function AuthGate() {
	const { userState, theme } = useUserThemeContext();
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle:
					theme == "light"
						? globalStyles.whiteThemeLighter
						: globalStyles.darkThemeDarker,
				statusBarStyle: theme == "light" ? "dark" : "light",
			}}
		>
			{userState ? (
				<>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Steps" component={Steps} />
				</>
			) : (
				<Stack.Screen
					name="RegistrationWrapper"
					component={RegistrationWrapper}
				/>
			)}
		</Stack.Navigator>
	);
}
