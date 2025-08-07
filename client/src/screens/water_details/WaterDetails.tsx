import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useGetOneWater } from "../../hooks/useWater";

export default function WaterDetails() {
	const route = useRoute<RouteProp<Routes, "WaterDetails">>();
	const { waterId } = route.params;
	const { water, loading, error } = useGetOneWater(null, waterId);
	return (
		<View>
			<Text>Water id: {waterId}</Text>
		</View>
	);
}
