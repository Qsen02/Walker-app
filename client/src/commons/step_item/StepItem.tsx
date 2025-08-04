import { Text, TouchableOpacity, View } from "react-native";

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
		<TouchableOpacity>
			<View>
				<Text style={{ color: "white" }}>{stepsCount}</Text>
			</View>
		</TouchableOpacity>
	);
}
