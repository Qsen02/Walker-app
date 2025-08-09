import {
	Modal,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../globalStyles";
import { User } from "../../../types/user";
import { Language, Theme } from "../../../types/UserAndTheme";
import { useState } from "react";
import InputField from "../../../commons/input_field/InputField";
import { editProfileStyles } from "./EditProfileStyles";

interface EditProfileProps {
	visible: boolean;
	visibleHandler: React.Dispatch<React.SetStateAction<boolean>>;
	user: User | null;
	userHandler: React.Dispatch<React.SetStateAction<User | null>>;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function EditProfile({
	visible,
	visibleHandler,
	user,
	userHandler,
	theme,
	language,
}: EditProfileProps) {
	const [formValues, setFormValues] = useState({
		username: user?.username || "",
		email: user?.email || "",
		purpose: String(user?.purpose || ""),
	});
	function close() {
		visibleHandler(false);
	}

	return (
		<Modal transparent={true} visible={visible} animationType="fade">
			<View style={globalStyles.modalOverlay}>
				<SafeAreaView
					style={[
						theme == "light"
							? globalStyles.whiteThemeLighter
							: globalStyles.darkThemeNormal,
						globalStyles.modalContainer,
					]}
				>
					<Text
						style={[
							theme == "light"
								? { color: "black" }
								: { color: "white" },
							editProfileStyles.title,
						]}
					>
						{language == "english"
							? "Edit your profile here"
							: "Редактирайте профила си тук"}
					</Text>
					<InputField
						title={`${
							language == "english"
								? "Username"
								: "Потребителско име"
						}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, username: e })
						}
						value={formValues.username}
						theme={theme}
					/>
					<InputField
						title={`${language == "english" ? "Email" : "Имейл"}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, email: e })
						}
						value={formValues.email}
						theme={theme}
					/>
					<InputField
						title={`${language == "english" ? "Purpose" : "Цел"}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, purpose: e })
						}
						value={formValues.purpose}
						theme={theme}
					/>
					<View style={editProfileStyles.buttonWrapper}>
						<TouchableOpacity style={globalStyles.button}>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "SAVE" : "ЗАПАЗИ"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={close}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "CANCEL" : "ОТКАЖИ"}
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	);
}
