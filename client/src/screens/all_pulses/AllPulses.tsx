import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { globalStyles } from "../../../globalStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { pulsesStyles } from "./AllPulsesStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { useGetOnlyUser } from "../../hooks/useUser";
import PulseItem from "./PulseItem/PulseItem";

export default function AllPulses() {
	const { theme, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "AllPulses">>();
	const { userId } = route.params;
	const navigation = useNavigation<NavigationProp<Routes>>();
	const { user, loading, error } = useGetOnlyUser(null, userId);

	return (
		<>
			{loading && !error ? (
				<ActivityIndicator
					color="rgba(6,173,0,1)"
					size={60}
					style={globalStyles.spinner}
				/>
			) : (
				""
			)}
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.goBack()}
			>
				<FontAwesome6
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeLighter
						: globalStyles.darkThemeDarker,
					pulsesStyles.wrapper,
				]}
			>
				<View style={pulsesStyles.title}>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							pulsesStyles.titleText,
						]}
					>
						{language == "english"
							? "All pulse measurements"
							: "Всички измервания на пулс"}
					</Text>
				</View>
				{error ? (
					<View style={globalStyles.errorContainer}>
						<Text style={globalStyles.errorText}>
							{language == "english"
								? "Server is not responding, please try again later!"
								: "Сървърът не отговаря, моля опитайте по късно!"}
						</Text>
					</View>
				) : user?.pulses.length == 0 ? (
					<View style={globalStyles.errorContainer}>
						<Text style={globalStyles.errorText}>
							{language == "english"
								? "No measurings yet"
								: "Няма измервания все още"}
						</Text>
					</View>
				) : (
					<ScrollView
						style={pulsesStyles.pulsesContainer}
						indicatorStyle={theme == "light" ? "black" : "white"}
					>
						<View style={pulsesStyles.pulsesContentContainer}>
							{user?.pulses.reverse().map((el) => (
								<PulseItem
									key={el._id}
									value={el.value}
									date={el.created_at}
									theme={theme}
									language={language}
								/>
							))}
						</View>
					</ScrollView>
				)}
			</View>
		</>
	);
}
