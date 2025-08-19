import { User } from "../../../types/user";
import { Language, Theme } from "../../../types/UserAndTheme";
import { useState } from "react";
import {
	Modal,
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../globalStyles";
import InputField from "../../../commons/input_field/InputField";
import { editProfileStyles } from "../edit_profile/EditProfileStyles";
import { parseSync } from "@babel/core";
import { useChangePassword } from "../../../hooks/useUser";

interface ChangePasswordProps {
	visible: boolean;
	visibleHandler: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string;
	theme: Theme | undefined;
	language: Language | undefined;
}

export default function ChangePassword({
	visible,
	visibleHandler,
	userId,
	theme,
	language,
}: ChangePasswordProps) {
	const [formValues, setFormValues] = useState({
		password: "",
	});
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState({
		password: "",
	});
	const changePassword = useChangePassword();

	function close() {
		visibleHandler(false);
	}

	async function onChangePassword() {
		try {
			const messages = {
				password: "",
			};
			const password = formValues.password;
			if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
				if (language == "english") {
					messages.password =
						"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!";
				} else {
					messages.password =
						"Паролата трябва да е с дължина поне 6 символа и трябва да съдържа числа, букви и поне една главна буква и специален символ!";
				}
			}
			if (messages.password) {
				setIsErr(true);
				setErrMessage(messages);
				return;
			}
			await changePassword(userId, { password: password });
			visibleHandler(false);
		} catch (err) {
			if (err instanceof Error) {
				setIsErr(true);
				if (language == "english") {
					setErrMessage({
						password: err.message,
					});
				} else {
					setErrMessage({
						password: "Старата парола не може да бъде нова!",
					});
				}
			} else {
				setIsErr(true);
				if (language == "english") {
					setErrMessage({
						password: "Error occurd!",
					});
				} else {
					setErrMessage({
						password: "Появи се грешка!",
					});
				}
			}
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
							? "Change your password here"
							: "Промени паролата си тук"}
					</Text>
					<InputField
						title={`${
							language == "english" ? "Password" : "Парола"
						}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, password: e })
						}
						value={formValues.password}
						theme={theme}
					/>
					{isErr ? (
						<Text style={editProfileStyles.error}>
							{errMessage.password}
						</Text>
					) : (
						""
					)}

					<View style={editProfileStyles.buttonWrapper}>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={onChangePassword}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "CHANGE" : "ПРОМЕНИ"}
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
