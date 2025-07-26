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
	const { theme, setUser } = useUserThemeContext();
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
				setErrMessage("Username or password don't match!");
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
			navigation.navigate("AuthGate",{
				screen:"Home"
			});
		} catch (err) {
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
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
					title="Username"
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, username: e })
					}
					value={formValues.username}
					theme={theme}
				/>
				<InputField
					title="Password"
					changeHanlder={(e: string) =>
						setFormValues({ ...formValues, password: e })
					}
					value={formValues.password}
					theme={theme}
				/>
				<TouchableOpacity style={globalStyles.button} onPress={onLogin}>
					<Text style={globalStyles.buttonText}>SUBMIT</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}
