import { Text, TouchableOpacity, View } from "react-native";
import { Language, Theme } from "../../../types/UserAndTheme";
import Icon from "react-native-vector-icons/FontAwesome6";
import { homeStyles } from "../HomeStyles";
import { globalStyles } from "../../../../globalStyles";
import { NavigationProp } from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";
import { User } from "../../../types/user";

interface HomePulseProps {
	language: Language | undefined;
	theme: Theme | undefined;
	navigation: NavigationProp<Routes>;
	user: User | null;
}

export default function HomePulse({
	language,
	theme,
	navigation,
	user,
}: HomePulseProps) {
	function onNavigateToPulse() {
		if (user) {
			navigation.navigate("Pulse", {
				userId: user._id,
			});
		}
	}

	return (
		<TouchableOpacity
			style={homeStyles.contentItemWrapper}
			onPress={onNavigateToPulse}
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
					{language === "bulgarian"
						? "Измерване на пулс"
						: "Heart rate measurement"}
				</Text>
				<Icon name="heart-pulse" size={40} color="red" />
			</View>
		</TouchableOpacity>
	);
}
