import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import HomeScreen from "../../screens/home/Home";
import RegistrationWrapper from "../../screens/registration_wrapper/RegistrationWrapper";
import { globalStyles } from "../../../globalStyles";
import Steps from "../../screens/steps/Steps";
import StepsDetails from "../../screens/steps/steps_details/StepsDetails";
import WaterDetails from "../../screens/water_details/WaterDetails";
import Settings from "../../screens/settings/Settings";

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
					<Stack.Screen name="StepsDetails" component={StepsDetails}/>
					<Stack.Screen name="WaterDetails" component={WaterDetails}/>
					<Stack.Screen name="Settings" component={Settings}/>
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
