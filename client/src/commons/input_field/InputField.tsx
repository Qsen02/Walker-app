import { KeyboardTypeOptions, View, Text, TextInput } from "react-native";
import { globalStyles } from "../../../globalStyles";
import { Theme } from "../../types/UserAndTheme";

interface InputFieldProps {
	title: string;
	changeHanlder: (e: string) => void;
	value: string;
	placeholder?: string;
	keyboardType?: KeyboardTypeOptions;
	theme: Theme | undefined;
}

export default function InputField({
	title,
	changeHanlder,
	value,
	placeholder,
	keyboardType,
	theme,
}: InputFieldProps) {
	return (
		<View style={globalStyles.inputWrapper}>
			<Text
				style={[
					theme == "light" ? { color: "black" } : { color: "white" },
					{fontSize:18}
				]}
			>
				{title}
			</Text>
			<TextInput
				style={[
					theme == "light"
						? globalStyles.whiteThemeDark
						: globalStyles.darkThemeLight,
					globalStyles.input,
				]}
				onChangeText={changeHanlder}
				value={value}
				placeholder={placeholder}
				keyboardType={keyboardType}
				secureTextEntry={
					title == "Password" ||
					title == "Repeat password" ||
					title == "Парола" ||
					title == "Повтори паролата"
						? true
						: false
				}
			/>
		</View>
	);
}
