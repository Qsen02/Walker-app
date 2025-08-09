import { Text, View } from "react-native";
import { Language, Theme } from "../../types/UserAndTheme";
import Icon from "react-native-vector-icons/FontAwesome6";
import { globalStyles } from "../../../globalStyles";

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
			style={
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal
			}
		>
			<View>
				<Icon name="droplet" size={40} color="skyblue" />
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					{waterCount} {language == "english" ? "ml" : "мл"}
				</Text>
			</View>
			<Text
				style={
					theme == "light" ? { color: "black" } : { color: "white" }
				}
			>
				{language == "english" ? "Date:" : "Дата:"} {date}
			</Text>
		</View>
	);
}
