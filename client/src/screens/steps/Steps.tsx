import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { stepsStyles } from "./StepsStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetLastSteps } from "../../hooks/useUser";
import StepItem from "../../commons/step_item/StepItem";

export default function Steps() {
	const { theme, userState } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Steps">>();
	const { userId } = route.params;
	const navigation = useNavigation<NavigationProp<Routes>>();
	const { steps, loading, error } = useGetLastSteps([], userId);

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
				<Icon
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
					stepsStyles.wrapper,
				]}
			>
				<View style={stepsStyles.title}>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							stepsStyles.titleText,
						]}
					>
						Last 7 days of activity
					</Text>
				</View>
				{error ? (
					<View style={globalStyles.errorContainer}>
						<Text style={globalStyles.errorText}>
							Server is not responding! Please try again later.
						</Text>
					</View>
				) : steps.length == 0 ? (
					<View style={globalStyles.errorContainer}>
						<Text style={globalStyles.errorText}>
							No activity yet.
						</Text>
					</View>
				) : (
					<ScrollView
						style={stepsStyles.stepsContainer}
						indicatorStyle={theme == "light" ? "black" : "white"}
					>
						<View style={stepsStyles.stepsContentContainer}>
							{steps.reverse().map((el) => (
								<StepItem
									key={el._id}
									id={el._id}
									purpose={userState?.purpose}
									stepsCount={el.stepsCount}
									date={el.date}
									theme={theme}
								/>
							))}
						</View>
					</ScrollView>
				)}
			</View>
		</>
	);
}
