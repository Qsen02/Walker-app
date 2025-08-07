import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useGetOneWater } from "../../hooks/useWater";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { waterDetailsStyles } from "./WaterDetailsStyles";

export default function WaterDetails() {
	const { theme } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "WaterDetails">>();
	const { waterId } = route.params;
	const { water, loading, error } = useGetOneWater(null, waterId);
	const navigation = useNavigation<NavigationProp<Routes>>();
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
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.goBack()}
			>
				<Icon
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal,
					waterDetailsStyles.wrapper,
				]}
			>
				<View style={waterDetailsStyles.buttonWrapper}>
					<TouchableOpacity style={globalStyles.button}>
						<Text style={globalStyles.buttonText}>ADD WATER</Text>
					</TouchableOpacity>
					<TouchableOpacity style={globalStyles.button}>
						<Text style={globalStyles.buttonText}>
							LAST WATER DAYS
						</Text>
					</TouchableOpacity>
				</View>
				<View style={waterDetailsStyles.contentWrapper}>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							waterDetailsStyles.text,
						]}
					>
						Date: {water?.date}
					</Text>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							waterDetailsStyles.text,
						]}
					>
						Amount of water you drank today:
					</Text>
					<View style={waterDetailsStyles.waterContent}>
						<Icon name="droplet" size={40} color="skyblue" />
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
								{ fontSize: 20 },
							]}
						>
							{water?.waterCount}ml
						</Text>
					</View>
				</View>
				<View style={waterDetailsStyles.contentWrapper}>
					{water && water.waterCount >= 1500 ? (
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
							]}
						>
							Well done! You've drunk your required amount of
							water for the day.
						</Text>
					) : (
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
							]}
						>
							You need to drink at least 1500ml of water per day.
						</Text>
					)}
				</View>
				<View style={waterDetailsStyles.contentWrapper}>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							waterDetailsStyles.text,
						]}
					>
						Don't forget to keep track of how much water you drink
						per day. Water helps maintain hydration, supports
						digestion, boosts energy, and keeps your skin healthy
					</Text>
				</View>
			</View>
		</>
	);
}
