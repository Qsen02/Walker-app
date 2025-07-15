import { Text, TouchableOpacity } from "react-native";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../commons/input_field/InputField";
import { useState } from "react";

export default function Register() {
	const { theme } = useUserThemeContext();
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",		repass: "",
	});

	return (
		<SafeAreaView
			style={[
				theme == "light"
					? globalStyles.whiteThemeNormal
					: globalStyles.darkThemeNormal,
				globalStyles.formWrapper,
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
			<TouchableOpacity style={globalStyles.button}>
				<Text style={globalStyles.buttonText}>SUBMIT</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
