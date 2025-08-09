import { TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "../HomeStyles";
import { globalStyles } from "../../../../globalStyles";
import { User, UserForAuth } from "../../../types/user";
import { NavigationProp } from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";
import { Language, Theme } from "../../../types/UserAndTheme";

interface HomeStepsProps {
	user: User | null;
	steps: number;
	navigation: NavigationProp<Routes>;
	userState: UserForAuth | null | undefined;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function HomeSteps({
	user,
	steps,
	navigation,
	userState,
	theme,
	language,
}: HomeStepsProps) {
	function onNavigateToSteps() {
		if (userState) {
			navigation.navigate("Steps", { userId: userState._id });
		}
	}

	return (
		<TouchableOpacity
			style={homeStyles.contentItemWrapper}
			onPress={onNavigateToSteps}
		>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal,
					homeStyles.contentItems,
				]}
			>
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						homeStyles.contenteItemText,
					]}
				>
					{language == "english" ? "Steps" : "Стъпки"}
				</Text>
				{user && (steps !== null || steps !== undefined) ? (
					<View
						style={[
							theme == "light"
								? globalStyles.whiteThemeDark
								: globalStyles.darkThemeLight,
							globalStyles.sliderContainer,
						]}
					>
						<View
							style={[
								globalStyles.slider,
								{
									width: `${(steps / user?.purpose) * 100}%`,
								},
							]}
						></View>
					</View>
				) : (
					<Text
						style={
							theme == "light"
								? { color: "black" }
								: { color: "white" }
						}
					>
						{language == "english"
							? "Error! No user yet"
							: "Грешка! Няма потребител все още"}
					</Text>
				)}
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						homeStyles.contenteItemText,
					]}
				>
					{steps}/{user?.purpose}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
