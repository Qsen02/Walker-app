import { Text, View } from "react-native";
import { Language, Theme } from "../../types/UserAndTheme";
import Icon from "react-native-vector-icons/FontAwesome6";
import { globalStyles } from "../../../globalStyles";
import { waterItemStyles } from "./WaterItemStyles";

interface WaterItemProps {
	waterCount: number;
	date: string;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function WaterItem({
	waterCount,
	date,
	theme,
	language,
}: WaterItemProps) {
	return (
		<View
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				waterItemStyles.wrapper,
			]}
		>
			<View style={waterItemStyles.waterWrapper}>
				<Icon name="droplet" size={30} color="skyblue" />
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						waterItemStyles.text,
					]}
				>
					{waterCount} {language == "english" ? "ml" : "мл"}
				</Text>
			</View>
			<Text
				style={[
					theme == "light" ? { color: "black" } : { color: "white" },
					waterItemStyles.text,
				]}
			>
				{language == "english" ? "Date:" : "Дата:"} {date}
			</Text>
		</View>
	);
}
