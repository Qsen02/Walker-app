import { RouteProp, useRoute } from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";
import { ActivityIndicator, Text, View } from "react-native";
import { useUserThemeContext } from "../../../contexts/user_theme_context";
import { globalStyles } from "../../../../globalStyles";
import { useGetOneSteps } from "../../../hooks/useSteps";

export default function StepsDetails() {
	const route = useRoute<RouteProp<Routes, "StepsDetails">>();
	const { stepsId } = route.params;
	const { theme } = useUserThemeContext();
	const { curSteps, loading, error } = useGetOneSteps(null, stepsId);

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
			<View
				style={
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal
				}
			>
				<Text
					style={
						theme == "light"
							? { color: "black" }
							: { color: "white" }
					}
				>
					Details for activity at
				</Text>
			</View>
		</>
	);
}
