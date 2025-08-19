import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { loginStyles } from "./LoginStyles";
import { useState } from "react";
import InputField from "../../commons/input_field/InputField";
import { useLogin } from "../../hooks/useUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import ErrorModal from "../../commons/error_modal/ErrorModal";

export default function Login() {
	const { theme, setUser, language } = useUserThemeContext();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const login = useLogin();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const navigation = useNavigation<NavigationProp<Routes>>();

	async function onLogin() {
		try {
			const username = formValues.username;
			const password = formValues.password;
			let isErrorsHave = false;
			if (username.length < 2) {
				isErrorsHave = true;
			}
			if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
				isErrorsHave = true;
			}
			if (isErrorsHave) {
				if (language == "english") {
					setErrMessage("Username or password don't match!");
				} else {
					setErrMessage("Името или паролата не съвпадат!");
				}
				setIsErr(true);
				return;
			}
			const user = await login({
				username: username,
				password: password,
			});
			if (setUser) {
				setUser(user);
			}
			setFormValues({
				username: "",
				password: "",
			});
			navigation.navigate("AuthGate", {
				screen: "Home",
			});
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				if (language == "english") {
					setErrMessage(err.message);
				} else {
					setErrMessage("Името или паролата не съвпадат!");
				}
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
					loginStyles.wrapper,
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
				/>
				<InputField
					title={`${language == "english" ? "Password" : "Парола"}`}
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, password: e })
					}
					value={formValues.password}
					theme={theme}
				/>
				<TouchableOpacity style={globalStyles.button} onPress={onLogin}>
					<Text style={globalStyles.buttonText}>
						{language == "english" ? "SUBMIT" : "ИЗПРАТИ"}
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}
