import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useUserThemeContext } from "../../../contexts/user_theme_context";
import { globalStyles } from "../../../../globalStyles";
import { useGetOneSteps } from "../../../hooks/useSteps";
import Icon from "react-native-vector-icons/FontAwesome6";
import { stepsDetailsStyles } from "./StepsDetailsStyles";

export default function StepsDetails() {
	const route = useRoute<RouteProp<Routes, "StepsDetails">>();
	const { stepsId } = route.params;
	const { theme, userState, language } = useUserThemeContext();
	const { curSteps, loading, error } = useGetOneSteps(null, stepsId);
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
				onPress={() => navigation.goBack()}
				style={globalStyles.arrowButton}
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
				<View
					style={[
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
						stepsDetailsStyles.wrapper,
					]}
				>
					<View style={stepsDetailsStyles.titleWrapper}>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								stepsDetailsStyles.titleText,
							]}
						>
							{language == "english"
								? "Details for activity at"
								: "Детайли за активността на"}
						</Text>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								stepsDetailsStyles.titleText,
							]}
						>
							{language == "english" ? "Date:" : "Дата:"}{" "}
							{curSteps?.date}
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
						{userState?.purpose && curSteps ? (
							<View
								style={[
									globalStyles.slider,
									{
										width: `${
											(curSteps?.stepsCount /
												userState.purpose) *
											100
										}%`,
									},
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
									? { color: "black" }
									: { color: "white" },
								stepsDetailsStyles.titleText,
							]}
						>
							{curSteps?.stepsCount}/{userState?.purpose}
						</Text>
					</View>
					<View>
						{userState && curSteps ? (
							curSteps.isPurposeCompleted ||
							curSteps.stepsCount >= userState.purpose ? (
								<Text
									style={[
										theme == "light"
											? { color: "black" }
											: { color: "white" },
										stepsDetailsStyles.titleText,
									]}
								>
									{language == "english"
										? `Well done! You successfully achieved its goal for ${userState.purpose} steps!`
										: `Браво! Ти успешно постигна целта си за ${userState.purpose} крачки!`}
								</Text>
							) : (
								<Text
									style={[
										theme == "light"
											? { color: "black" }
											: { color: "white" },
										stepsDetailsStyles.titleText,
									]}
								>
									{language == "english"
										? `${
												userState?.purpose -
												curSteps?.stepsCount
										  } steps didn't have enough to achieve your goal, you need to try harder.`
										: `${
												userState?.purpose -
												curSteps?.stepsCount
										  } крачки не достигат за постигането на вашата цел, трябва да се постараете повече.`}
								</Text>
							)
						) : (
							<Text>{language=="english"?"No user or steps yet.":"Няма потребител или крачки все още."}</Text>
						)}
					</View>
				</View>
			)}
		</>
	);
}
