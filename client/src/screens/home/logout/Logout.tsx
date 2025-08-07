import { Modal, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../../globalStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../../types/RoutingTable";

interface LogoutProps {
	visible: boolean;
	visibleHanlder: React.Dispatch<React.SetStateAction<boolean>>;
	theme: "light" | "dark" | undefined;
	removeUserHandler: (() => Promise<void>) | undefined;
	language: "bulgarian" | "english" | undefined;
}

export default function Logout({
	visible,
	visibleHanlder,
	theme,
	removeUserHandler,
	language,
}: LogoutProps) {
	const navigation = useNavigation<NavigationProp<Routes>>();
	function onClose() {
		visibleHanlder(false);
	}

	async function onLogout() {
		if (removeUserHandler) {
			await removeUserHandler();
			navigation.navigate("AuthGate", {
				screen: "RegistrationWrapper",
			});
		}
	}

	return (
		<Modal transparent={true} visible={visible} animationType="fade">
			<View style={globalStyles.modalOverlay}>
				<View
					style={[
						theme == "light"
							? globalStyles.whiteThemeLighter
							: globalStyles.darkThemeNormal,
						globalStyles.modalContainer,
					]}
				>
					<Text
						style={[
							globalStyles.confirmModalText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{language == "english"
							? "Are you sure you want to logout?"
							: "Сигурни ли сте че искате да излезете?"}
					</Text>
					<View style={globalStyles.confirmModalButtons}>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={onLogout}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "Yes" : "Да"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={onClose}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "No" : "Не"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
