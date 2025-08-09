import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import {
	ActivityIndicator,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import { Routes } from "../../../types/RoutingTable";
import { globalStyles } from "../../../../globalStyles";
import { useUserThemeContext } from "../../../contexts/user_theme_context";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetLastWater } from "../../../hooks/useUser";
import { waterDaysStyles } from "./WaterDaysStyles";
import WaterItem from "../../../commons/water_item/WaterItem";

export default function WaterDays() {
	const { theme, userState, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Water">>();
	const { userId } = route.params;
	const navigation = useNavigation<NavigationProp<Routes>>();
	const { waterDays, loading, error } = useGetLastWater([], userId);

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
			{error ? (
				<View
					style={[
						globalStyles.errorContainer,
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
					]}
				>
					<Text
						style={[
							globalStyles.errorText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{language == "english"
							? "Server is not responding, please try again later!"
							: "Сървърът не отговаря, моля опитайте по късно!"}
					</Text>
				</View>
			) : (
				<View style={waterDaysStyles.wrapper}>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							waterDaysStyles.title,
						]}
					>
						{language == "english"
							? "The last 7 days you drank water"
							: "Последните 7 дни в които сте пили вода"}
					</Text>
					{waterDays.length == 0 ? (
						<View style={globalStyles.errorContainer}>
							<Text
								style={[
									globalStyles.errorText,
									theme == "light"
										? { color: "black" }
										: { color: "white" },
								]}
							>
								{language == "english"
									? "No water days yet"
									: "Няма дни за водата все още"}
							</Text>
						</View>
					) : (
						<ScrollView>
							<View>
								{waterDays.map((el) => (
									<WaterItem
										key={el._id}
										waterCount={el.waterCount}
										date={el.date}
										theme={theme}
										language={language}
									/>
								))}
							</View>
						</ScrollView>
					)}
				</View>
			)}
		</>
	);
}
