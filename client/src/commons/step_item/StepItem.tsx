import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../globalStyles";
import { stepItemStyles } from "./StepItemStyles";

interface StepItemProps {
	id: string;
	stepsCount: number;
	purpose: number | undefined;
	date: string;
	theme: "light" | "dark" | undefined;
}

export default function StepItem({
	id,
	stepsCount,
	purpose,
	date,
	theme,
}: StepItemProps) {
	return (
		<TouchableOpacity
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				stepItemStyles.itemWrapper,
			]}
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
					Date: {date}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
