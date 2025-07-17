import { Text, TouchableOpacity } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../commons/input_field/InputField";
import { useState } from "react";
import { useRegister } from "../../hooks/userUser";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../types/RoutingTable";

export default function Register() {
	const { theme, setUser } = useUserThemeContext();
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",
		repass: "",
	});
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const register = useRegister();
	const navigation = useNavigation<NavigationType>();

	async function onRegister() {
		try {
			const username = formValues.username;
			const email = formValues.email;
			const password = formValues.password;
			const repass = formValues.repass;
			const errors: string[] = [];
			if (username.length < 2) {
				errors.push("Username must be at least 2 letters long!");
			}
			if (!/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/.test(email)) {
				errors.push("Email must be valid email!");
			}
			if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
				errors.push(
					"Password must be at least 6 symbols and must contain digits, letters and at least one capital letter and special symbol!"
				);
			}
			if (password != repass) {
				errors.push("Repeat password must match!");
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
			navigation.navigate("Home");
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
		<SafeAreaView
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				globalStyles.formWrapper,
			]}
		>
			{isErr ? <Text style={globalStyles.errors}>{errMessage}</Text> : ""}
			<InputField
				title="Username"
				changeHanlder={(e: string) =>
					setFormValues({ ...formValues, username: e })
				}
				value={formValues.username}
				theme={theme}
			/>
			<InputField
				title="Email"
				changeHanlder={(e: string) =>
					setFormValues({ ...formValues, email: e })
				}
				value={formValues.email}
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
			<InputField
				title="Repeat password"
				changeHanlder={(e: string) =>
					setFormValues({ ...formValues, repass: e })
				}
				value={formValues.repass}
				theme={theme}
			/>
			<TouchableOpacity style={globalStyles.button} onPress={onRegister}>
				<Text style={globalStyles.buttonText}>SUBMIT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
