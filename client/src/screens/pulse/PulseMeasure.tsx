import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";

export default function PulseMeasure() {
	const { theme, language } = useUserThemeContext();
    const navigation = useNavigation<NavigationProp<Routes>>();
    
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
				]}
			>
				<View>
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
			</View>
		</>
	);
}
