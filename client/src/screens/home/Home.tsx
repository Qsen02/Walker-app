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

export default function HomeScreen() {
	const { userState, removeUser, theme, changeTheme } = useUserThemeContext();
	const { user, loading, error, steps } = useGetOneUser(null, userState?._id);
	const navigation = useNavigation<NavigationProp<Routes>>();
	const [isLogoutActive, setIsLogoutActive] = useState(false);

	function openLogout() {
		setIsLogoutActive(true);
	}

	function onChangeTheme() {
		if (changeTheme) {
			changeTheme();
		}
	}

	function onNavigateToSteps() {
		if (userState) {
			navigation.navigate("Steps", { userId: userState._id });
		}
	}

	function onNavigateToWaterDetails() {
		if (user) {
			navigation.navigate("WaterDetails", {
				waterId: user.waterDays[user.waterDays.length - 1]._id,
			});
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
						Server is not responding, please try again later!
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
						<TouchableOpacity>
							<Icon
								name="circle-user"
								color={theme == "light" ? "black" : "white"}
								size={24}
							/>
						</TouchableOpacity>
						<Icon
							name="circle-half-stroke"
							color={theme == "light" ? "black" : "white"}
							size={24}
							onPress={onChangeTheme}
						/>
						<TouchableOpacity
							onPress={openLogout}
							style={globalStyles.button}
						>
							<Text style={globalStyles.buttonText}>LOGOUT</Text>
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
									Steps
								</Text>
								{user &&
								(steps !== null || steps !== undefined) ? (
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
													width: `${
														(steps /
															user?.purpose) *
														100
													}%`,
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
										Error! No user yet
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
						<TouchableOpacity
							style={homeStyles.contentItemWrapper}
							onPress={onNavigateToWaterDetails}
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
									Water
								</Text>
								<Icon
									name="droplet"
									size={40}
									color="skyblue"
								/>
								<Text
									style={[
										theme == "light"
											? { color: "black" }
											: { color: "white" },
										homeStyles.contenteItemText,
									]}
								>
									{
										user?.waterDays[
											user.waterDays.length - 1
										].waterCount
									}{" "}
									ml
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
}
