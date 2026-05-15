import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { pulseMeasureStyles } from "./PulseMeasureStyles";

export default function PulseMeasure() {
	const { theme, language } = useUserThemeContext();
    const navigation = useNavigation<NavigationProp<Routes>>();
    const route = useRoute<RouteProp<Routes, "Pulse">>();
    const { userId } = route.params;

	return (
		<>
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.navigate("Home")}
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
					pulseMeasureStyles.wrapper,
				]}
			>
				<View style={pulseMeasureStyles.buttonWrapper}>
					<TouchableOpacity style={globalStyles.button}>
						<Text style={globalStyles.buttonText}>
							{language === "bulgarian"
								? "Измервания"
								: "Measurements"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={globalStyles.button}>
						<Text style={globalStyles.buttonText}>
							{language === "bulgarian"
								? "Измери пулс"
								: "Pulse measure"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={pulseMeasureStyles.measureWrapper}>
					<Text
						style={[
							theme === "dark"
								? { color: "white" }
								: { color: "black" },
							pulseMeasureStyles.measureWrapperText,
						]}
					>
						{language === "bulgarian"
							? "Измерете пулса си тук..."
							: "Measure your pulse here..."}
					</Text>
					<Icon name="heart-pulse" size={70} color="red" />
				</View>
			</View>
		</>
	);
}
