import {
	SafeAreaView,
	Text,
	TouchableOpacity
} from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { loginStyles } from "./LoginStyles";
import { useState } from "react";
import InputField from "../../commons/input_field/InputField";

export default function Login() {
	const { theme } = useUserThemeContext();
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});

	return (
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
			<TouchableOpacity style={globalStyles.button}>
				<Text style={globalStyles.buttonText}>SUBMIT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
