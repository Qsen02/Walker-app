import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home/Home";
import UserThemeContextProvider from "./src/contexts/user_theme_context";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<UserThemeContextProvider>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="Home" component={HomeScreen} />
				</Stack.Navigator>
			</UserThemeContextProvider>
		</NavigationContainer>
	);
}
