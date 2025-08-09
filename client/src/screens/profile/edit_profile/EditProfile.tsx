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
import { useEditUser } from "../../../hooks/useUser";

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
	const editUser = useEditUser();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState({
		username: "",
		email: "",
		purpose: "",
	});

	function close() {
		visibleHandler(false);
	}

	async function onEdit() {
		try {
			const messages = {
				username: "",
				email: "",
				purpose: "",
			};
			const username = formValues.username;
			const email = formValues.email;
			const purpose = Number(formValues.purpose);
			if (username.length < 2) {
				if (language == "english") {
					messages.username =
						"Username must be at least 2 letters long!";
				} else {
					messages.username =
						"Името трябва да бъде поне 2 букви дълго!";
				}
			}
			if (!/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/.test(email)) {
				if (language == "english") {
					messages.email = "Email must be valid email!";
				} else {
					messages.email = "Имейла трябва да бъде валиден имейл!";
				}
			}
			if (purpose < 1000) {
				if (language == "english") {
					messages.purpose = "Purpose must be at least 1000 steps!";
				} else {
					messages.purpose = "Целта трябва да е поне 1000 стъпки!";
				}
			}
			if (messages.email || messages.purpose || messages.username) {
				setIsErr(true);
				setErrMessage(messages);
				return;
			}
			const updatedUser = await editUser(user?._id, {
				username:username,
				email:email,
				purpose:purpose,
			});
			userHandler(updatedUser);
			visibleHandler(false);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			}
			setIsErr(true);
			setErrMessage({
				username: "Error occurd!",
				email: "Error occurd!",
				purpose: "Error occurd!",
			});
			return;
		}
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
					{isErr ? (
						<Text style={editProfileStyles.error}>
							{errMessage.username}
						</Text>
					) : (
						""
					)}
					<InputField
						title={`${language == "english" ? "Email" : "Имейл"}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, email: e })
						}
						value={formValues.email}
						theme={theme}
					/>
					{isErr ? (
						<Text style={editProfileStyles.error}>
							{errMessage.email}
						</Text>
					) : (
						""
					)}
					<InputField
						title={`${language == "english" ? "Purpose" : "Цел"}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, purpose: e })
						}
						value={formValues.purpose}
						theme={theme}
					/>
					{isErr ? (
						<Text style={editProfileStyles.error}>
							{errMessage.purpose}
						</Text>
					) : (
						""
					)}
					<View style={editProfileStyles.buttonWrapper}>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={onEdit}
						>
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
