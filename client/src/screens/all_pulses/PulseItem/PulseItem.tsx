import { Text, View } from "react-native";
import { Language, Theme } from "../../../types/UserAndTheme";
import { globalStyles } from "../../../../globalStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { pulseItemStyles } from "./PulseItemStyles";

interface StepItemProps {
	value: number;
	date: string;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function PulseItem({
	value,
	date,
	theme,
	language,
}: StepItemProps) {
	const measureDate = new Date(date);
	return (
		<View
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				pulseItemStyles.itemWrapper,
			]}
		>
			<View>
				<Text
					style={[
						theme == "light"
							? { color: "dark" }
							: { color: "white" },
						pulseItemStyles.bpmValue,
					]}
				>
					{value} BPM
				</Text>
			</View>
			<FontAwesome6 name="heart-pulse" size={40} color="red" />
			<View>
				<Text
					style={[
						theme == "light"
							? { color: "dark" }
							: { color: "white" },
						pulseItemStyles.bpmValue,
					]}
				>
					{language == "english" ? "Date:" : "Дата:"}{" "}
					{`${measureDate.getDate()}-${measureDate.getMonth() + 1 < 10 ? 0 : ""}${measureDate.getMonth() + 1}-${measureDate.getFullYear()}`}
				</Text>
			</View>
		</View>
	);
}
