import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { stepsStyles } from "./StepsStyles";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function Steps() {
	const { theme } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Steps">>();
	const { userId } = route.params;
    const navigation=useNavigation<NavigationProp<Routes>>();

	return (
		<View
			style={[
				theme == "light"
					? globalStyles.whiteThemeLighter
					: globalStyles.darkThemeDarker,
				stepsStyles.wrapper,
			]}
		>
			<TouchableOpacity style={stepsStyles.arrowButton} onPress={()=>navigation.goBack()}>
				<Icon
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			<View style={stepsStyles.title}>
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						stepsStyles.titleText,
					]}
				>
					Last 7 days of activity
				</Text>
			</View>
		</View>
	);
}
