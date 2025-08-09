import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../../types/RoutingTable";
import { globalStyles } from "../../../../globalStyles";
import { useUserThemeContext } from "../../../contexts/user_theme_context";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetLastWater } from "../../../hooks/useUser";

export default function WaterDays() {
	const { theme, userState, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Water">>();
	const { userId } = route.params;
	const navigation = useNavigation<NavigationProp<Routes>>();
    const {waterDays,loading,error}=useGetLastWater([],userId);

	return (
		<>
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.goBack()}
			>
				<Icon
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			<View>
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					{language == "english"
						? "The last 7 days you drank water"
						: "Последните 7 дни в които сте пили вода"}
				</Text>
			</View>
		</>
	);
}
