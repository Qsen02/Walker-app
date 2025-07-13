import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserThemeContextProvider from "./src/contexts/user_theme_context";
import AuthGate from "./src/commons/auth_gate/AuthGate";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<UserThemeContextProvider>
				<Stack.Navigator
					initialRouteName="AuthGate"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="AuthGate" component={AuthGate} />
				</Stack.Navigator>
			</UserThemeContextProvider>
		</NavigationContainer>
	);
}
