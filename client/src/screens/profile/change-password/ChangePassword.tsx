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

	function close() {
		visibleHandler(false);
	}

    async function onChangePassword(){
        console.log(userId);
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
						<TouchableOpacity style={globalStyles.button}>
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
