import { Text, TouchableOpacity } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../commons/input_field/InputField";
import { useState } from "react";
import { useRegister } from "../../hooks/useUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import ErrorModal from "../../commons/error_modal/ErrorModal";

export default function Register() {
	const { theme, setUser, language } = useUserThemeContext();
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",
		repass: "",
	});
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const register = useRegister();
	const navigation = useNavigation<NavigationProp<Routes>>();

	async function onRegister() {
		try {
			const username = formValues.username;
			const email = formValues.email;
			const password = formValues.password;
			const repass = formValues.repass;
			const errors: string[] = [];
			if (username.length < 2) {
				if (language == "english") {
					errors.push("Username must be at least 2 letters long!");
				} else {
					errors.push("Името трябва да бъде поне 2 букви дълго!");
				}
			}
			if (!/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/.test(email)) {
				if (language == "english") {
					errors.push("Email must be valid email!");
				} else {
					errors.push("Имейла трябва да бъде валиден имейл!");
				}
			}
			if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
				if (language == "english") {
					errors.push(
						"Password must be at least 6 symbols and must contain digits, letters and at least one capital letter and special symbol!"
					);
				} else {
					errors.push(
						"Паролата трябва да бъде поне 6 символа и да съдържа цифри, букви поне една главна буква и специален символ!"
					);
				}
			}
			if (password != repass) {
				if (language == "english") {
					errors.push("Repeat password must match!");
				} else {
					errors.push("Паролата трябва да съвпада!");
				}
			}
			if (errors.length > 0) {
				setErrMessage(errors.join("\n"));
				setIsErr(true);
				return;
			}
			const newUser = await register({
				username: username,
				email: email,
				password: password,
				repass: repass,
			});
			if (setUser) {
				setUser(newUser);
			}
			setFormValues({
				username: "",
				email: "",
				password: "",
				repass: "",
			});
			navigation.navigate("AuthGate", {
				screen: "Home",
			});
		} catch (err) {
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				if (language == "english") {
					setErrMessage("Error occurd!");
				} else {
					setErrMessage("Възникна грешка!");
				}
			}
			return;
		}
	}

	return (
		<>
			{isErr ? (
				<ErrorModal
					message={errMessage}
					visible={isErr}
					visibleHanlder={setIsErr}
					messageHandler={setErrMessage}
					theme={theme}
				/>
			) : (
				""
			)}
			<SafeAreaView
				style={[
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal,
					globalStyles.formWrapper,
				]}
			>
				<InputField
					title={`${
						language == "english" ? "Username" : "Потребителско име"
					}`}
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, username: e })
					}
					value={formValues.username}
					theme={theme}
					language={language}
				/>
				<InputField
					title={`${language == "english" ? "Email" : "Имейл"}`}
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, email: e })
					}
					value={formValues.email}
					theme={theme}
					language={language}
				/>
				<InputField
					title={`${language == "english" ? "Password" : "Парола"}`}
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, password: e })
					}
					value={formValues.password}
					theme={theme}
					language={language}
				/>
				<InputField
					title={`${
						language == "english"
							? "Repeat password"
							: "Повтори паролата"
					}`}
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, repass: e })
					}
					value={formValues.repass}
					theme={theme}
					language={language}
				/>
				<TouchableOpacity
					style={globalStyles.button}
					onPress={onRegister}
				>
					<Text style={globalStyles.buttonText}>
						{language == "english" ? "SUBMIT" : "ИЗПРАТИ"}
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}
