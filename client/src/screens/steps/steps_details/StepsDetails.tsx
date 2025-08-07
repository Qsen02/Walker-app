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
	const { theme, userState } = useUserThemeContext();
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
				style={stepsDetailsStyles.arrow}
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
						Details for activity at
					</Text>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							stepsDetailsStyles.titleText,
						]}
					>
						Date: {curSteps?.date}
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
					{userState && curSteps? (
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
								Well done! You successfully achieved its goal
								for {userState.purpose} steps!
							</Text>
						) :(
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									stepsDetailsStyles.titleText,
								]}
							>
								{userState?.purpose - curSteps?.stepsCount}{" "}
								steps didn't have enough to achieve your goal,
								you need to try harder.
							</Text>
						)
					) : (
						<Text>No user or steps yet.</Text>
					)}
				</View>
			</View>
		</>
	);
}
