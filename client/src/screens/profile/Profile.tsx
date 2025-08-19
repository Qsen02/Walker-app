import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useGetOnlyUser } from "../../hooks/useUser";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { profileStyles } from "./ProfileStyles";
import { useState } from "react";
import EditProfile from "./edit_profile/EditProfile";
import ChangePassword from "./change-password/ChangePassword";

export default function Profile() {
	const { theme, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Profile">>();
	const { userId } = route.params;
	const { user, setUser, loading, error } = useGetOnlyUser(null, userId);
	const navigation = useNavigation<NavigationProp<Routes>>();
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [isChangePasswordOpen, setIsChangePassowrdOpen] = useState(false);

	function openEditForm() {
		setIsEditFormOpen(true);
	}

	function openChangePasswordForm() {
		setIsChangePassowrdOpen(true);
	}

	return (
		<>
			{isEditFormOpen ? (
				<EditProfile
					visible={isEditFormOpen}
					visibleHandler={setIsEditFormOpen}
					user={user}
					userHandler={setUser}
					theme={theme}
					language={language}
				/>
			) : (
				""
			)}
			{isChangePasswordOpen ? (
				<ChangePassword
					visible={isChangePasswordOpen}
					visibleHandler={setIsChangePassowrdOpen}
					userId={userId}
					theme={theme}
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
				<>
					<TouchableOpacity
						style={globalStyles.arrowButton}
						onPress={() => navigation.navigate("Home")}
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
							profileStyles.wrapper,
						]}
					>
						<Icon
							name="circle-user"
							color={theme == "light" ? "black" : "white"}
							size={50}
						/>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								profileStyles.text,
							]}
						>
							{language == "english"
								? "Username:"
								: "Потребителско име:"}{" "}
							{user?.username}
						</Text>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								profileStyles.text,
							]}
						>
							{language == "english" ? "Email:" : "Имейл:"}{" "}
							{user?.email}
						</Text>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								profileStyles.text,
							]}
						>
							{language == "english" ? "Purpose:" : "Цел:"}{" "}
							{user?.purpose}{" "}
							{language == "english" ? "steps" : "крачки"}
						</Text>
						<View style={profileStyles.buttonWrapper}>
							<TouchableOpacity
								style={globalStyles.button}
								onPress={openEditForm}
							>
								<Text style={globalStyles.buttonText}>
									{language == "english"
										? "EDIT"
										: "РЕДАКТИРАЙ"}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={globalStyles.button}
								onPress={openChangePasswordForm}
							>
								<Text style={globalStyles.buttonText}>
									{language == "english"
										? "PASSWORD"
										: "ПАРОЛА"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}
		</>
	);
}
