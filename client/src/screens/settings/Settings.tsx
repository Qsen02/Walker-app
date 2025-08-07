import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { useState } from "react";
import { settingsStyles } from "./SettingsStyles";

export default function Settings() {
	const { theme, changeTheme, language, changeLanguage } =
		useUserThemeContext();
	const navigation = useNavigation<NavigationProp<Routes>>();
	const [isEnabled, setIsEndabled] = useState(() => {
		if (theme == "dark") {
			return true;
		}
		return false;
	});

	function onChangeEnabled() {
		if (isEnabled) {
			setIsEndabled(false);
		} else {
			setIsEndabled(true);
		}
		if (changeTheme) {
			changeTheme();
		}
	}

	function setEnglish() {
		if (changeLanguage) {
			changeLanguage("english");
		}
	}

	function setBulgarian() {
		if (changeLanguage) {
			changeLanguage("bulgarian");
		}
	}
	return (
		<>
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
			<View style={settingsStyles.wrapper}>
				<Text
					style={[
						theme == "light"
							? { color: "black" }
							: { color: "white" },
						settingsStyles.title,
					]}
				>
					{language == "english" ? "Settings" : "Настройки"}
				</Text>
				<View
					style={[
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
						settingsStyles.themeWrapper,
					]}
				>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							settingsStyles.text,
						]}
					>
						{language == "english" ? "Dark theme" : "Тъмна тема"}
					</Text>
					<Switch
						trackColor={{
							false: "darkgray",
							true: "rgba(6, 173, 0, 1)",
						}}
						thumbColor={isEnabled ? "rgba(6, 151, 1, 1)" : "grey"}
						value={isEnabled}
						onValueChange={onChangeEnabled}
					/>
				</View>
				<View
					style={[
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
						settingsStyles.languageWapper,
					]}
				>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							settingsStyles.title,
						]}
					>
						{language == "english" ? "Language" : "Език"}
					</Text>
					<View style={settingsStyles.languageButtonsWrapper}>
						<TouchableOpacity
							style={[
								language == "bulgarian"
									? { backgroundColor: "grey" }
									: "",
                                    settingsStyles.languageButton
							]}
							onPress={setBulgarian}
						>
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									settingsStyles.text,
								]}
							>
								{language == "english"
									? "Bulgarian"
									: "Български"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								language == "english"
									? { backgroundColor: "grey" }
									: "",
                                    settingsStyles.languageButton
							]}
							onPress={setEnglish}
						>
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									settingsStyles.text,
								]}
							>
								{language == "english"
									? "English"
									: "Английски"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	);
}
