import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetOneUser } from "../../hooks/useUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { useState } from "react";
import Logout from "./logout/Logout";
import HomeSteps from "./home_steps/HomeSteps";
import HomeWater from "./home_water/HomeWater";

export default function HomeScreen() {
	const { userState, removeUser, theme, language } = useUserThemeContext();
	const { user, loading, error, steps } = useGetOneUser(null, userState?._id);
	const navigation = useNavigation<NavigationProp<Routes>>();
	const [isLogoutActive, setIsLogoutActive] = useState(false);

	function openLogout() {
		setIsLogoutActive(true);
	}

	function onNavigateToSettings() {
		navigation.navigate("Settings");
	}

	function onNavigateToProfile() {
		if (userState) {
			navigation.navigate("Profile", { userId: userState?._id });
		}
	}

	return (
		<>
			{isLogoutActive ? (
				<Logout
					visible={isLogoutActive}
					visibleHanlder={setIsLogoutActive}
					theme={theme}
					removeUserHandler={removeUser}
					language={language}
				/>
			) : (
				""
			)}
			{loading && !error ? (
				<ActivityIndicator
					size={60}
					color="rgba(6,173,0,1)"
					style={globalStyles.spinner}
				/>
			) : !loading && error ? (
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
						homeStyles.container,
						theme == "light"
							? globalStyles.whiteThemeLighter
							: globalStyles.darkThemeDarker,
					]}
				>
					<View style={homeStyles.buttonsContainer}>
						<TouchableOpacity onPress={onNavigateToProfile}>
							<Icon
								name="circle-user"
								color={theme == "light" ? "black" : "white"}
								size={24}
							/>
						</TouchableOpacity>
						<Icon
							name="gear"
							color={theme == "light" ? "black" : "white"}
							size={24}
							onPress={onNavigateToSettings}
						/>
						<TouchableOpacity
							onPress={openLogout}
							style={globalStyles.button}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "LOGOUT" : "ИЗХОД"}
							</Text>
						</TouchableOpacity>
					</View>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							homeStyles.title,
						]}
					>
						Walker app
					</Text>
					<View style={homeStyles.contentContainer}>
						<HomeSteps
							user={user}
							steps={steps}
							userState={userState}
							navigation={navigation}
							theme={theme}
							language={language}
						/>
						<HomeWater
							user={user}
							navigation={navigation}
							theme={theme}
							language={language}
						/>
					</View>
				</View>
			)}
		</>
	);
}
