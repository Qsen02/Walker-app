import { TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "../HomeStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { globalStyles } from "../../../../globalStyles";
import { NavigationProp } from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";
import { User } from "../../../types/user";

interface HomeWaterProps {
	user: User | null;
	navigation: NavigationProp<Routes>;
	theme: "light" | "dark" | undefined;
	language: "bulgarian" | "english" | undefined;
}

export default function HomeWater({
	user,
	navigation,
	theme,
	language,
}: HomeWaterProps) {
	function onNavigateToWaterDetails() {
		if (user) {
			navigation.navigate("WaterDetails", {
				waterId: user.waterDays[user.waterDays.length - 1]._id,
			});
		}
	}

	return (
		<TouchableOpacity
			style={homeStyles.contentItemWrapper}
			onPress={onNavigateToWaterDetails}
		>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal,
					homeStyles.contentItems,
				]}
			>
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						homeStyles.contenteItemText,
					]}
				>
					{language == "english" ? "Water" : "Вода"}
				</Text>
				<Icon name="droplet" size={40} color="skyblue" />
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						homeStyles.contenteItemText,
					]}
				>
					{user?.waterDays[user.waterDays.length - 1].waterCount}{" "}
					{language == "english" ? "ml" : "мл"}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
