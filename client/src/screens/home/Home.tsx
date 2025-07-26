import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles } from "./HomeStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useGetOneUser } from "../../hooks/useUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import Slider from "@react-native-community/slider";

export default function HomeScreen() {
	const { userState, removeUser, theme, changeTheme } = useUserThemeContext();
	const { user, loading, error } = useGetOneUser(null, userState?._id);
	const navigation = useNavigation<NavigationProp<Routes>>();

	async function onLogout() {
		if (removeUser) {
			await removeUser();
			navigation.navigate("AuthGate", {
				screen: "RegistrationWrapper",
			});
		}
	}

	function onChangeTheme() {
		if (changeTheme) {
			changeTheme();
		}
	}

	return (
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
					onPress={onLogout}
					style={globalStyles.button}
				>
					<Text style={globalStyles.buttonText}>LOGOUT</Text>
				</TouchableOpacity>
			</View>
			<Text
				style={[
					theme == "light" ? { color: "black" } : { color: "white" },
					homeStyles.title,
				]}
			>
				Walker app
			</Text>
			<View style={homeStyles.contentContainer}>
				<TouchableOpacity style={homeStyles.contentItemWrapper}>
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
						{user ? (
							<View
								style={[
									theme == "light"
										? globalStyles.whiteThemeDark
										: globalStyles.darkThemeLight,
									homeStyles.sliderContainer,
								]}
							>
								<View
									style={[
										homeStyles.slider,
										{
											width: `${
												(user?.activeDays[
													user.activeDays.length - 1
												].stepsCount /
													user?.purpose) *
												100
											}%`,
										},
									]}
								></View>
							</View>
						) : (
							<Text>Error! No user yet</Text>
						)}
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								homeStyles.contenteItemText,
							]}
						>
							{
								user?.activeDays[user.activeDays.length - 1]
									.stepsCount
							}
							/{user?.purpose}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={homeStyles.contentItemWrapper}>
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
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								homeStyles.contenteItemText,
							]}
						>
							{
								user?.waterDays[user.waterDays.length - 1]
									.waterCount
							}{" "}
							ml
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
