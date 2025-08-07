import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useGetOneWater } from "../../hooks/useWater";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserThemeContext } from "../../contexts/user_theme_context";

export default function WaterDetails() {
	const { theme } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "WaterDetails">>();
	const { waterId } = route.params;
	const { water, loading, error } = useGetOneWater(null, waterId);
	const navigation = useNavigation<NavigationProp<Routes>>();
	return (
		<>
			{loading && !error ? (
				<ActivityIndicator
					size={60}
					color="rgba(6,173,0,1)"
					style={globalStyles.spinner}
				/>
			) : (
				""
			)}
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
				<Text>Water id: {waterId}</Text>
			</View>
		</>
	);
}
