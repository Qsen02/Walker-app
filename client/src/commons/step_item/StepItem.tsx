import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../globalStyles";
import { stepItemStyles } from "./StepItemStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { Language, Theme } from "../../types/UserAndTheme";

interface StepItemProps {
	id: string;
	stepsCount: number;
	purpose: number | undefined;
	date: string;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function StepItem({
	id,
	stepsCount,
	purpose,
	date,
	theme,
	language
}: StepItemProps) {
	const navigation=useNavigation<NavigationProp<Routes>>()
	return (
		<TouchableOpacity
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				stepItemStyles.itemWrapper,
			]}
			onPress={()=>navigation.navigate("StepsDetails",{stepsId:id})}
		>
			<View>
				<Text
					style={[
						theme == "light"
							? { color: "dark" }
							: { color: "white" },
						stepItemStyles.stepsCount,
					]}
				>
					{stepsCount}/{purpose}
				</Text>
			</View>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeDark
						: globalStyles.darkThemeLight,

					globalStyles.sliderContainer,
				]}
			>
				{purpose ? (
					<View
						style={[
							globalStyles.slider,
							{ width: `${(stepsCount / purpose) * 100}%` },
						]}
					></View>
				) : (
					""
				)}
			</View>
			<View>
				<Text
					style={[
						theme == "light"
							? { color: "dark" }
							: { color: "white" },
						stepItemStyles.stepsCount,
					]}
				>
					{language=="english"?"Date:":"Дата:"} {date}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
