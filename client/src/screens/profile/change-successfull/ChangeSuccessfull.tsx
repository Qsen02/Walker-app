import { SetStateAction } from "react";
import { Language, Theme } from "../../../types/UserAndTheme";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { globalStyles } from "../../../../globalStyles";

interface ChangeSuccessfullProps {
	visible: boolean;
	visibleHandler: React.Dispatch<SetStateAction<boolean>>;
	language: Language | undefined;
	theme: Theme | undefined;
}

export default function ChangeSuccessfull({
	visible,
	visibleHandler,
	language,
	theme,
}: ChangeSuccessfullProps) {
	function close() {
		visibleHandler(false);
	}

	return (
		<Modal transparent={true} visible={visible} animationType="fade">
			<View style={globalStyles.modalOverlay}>
				<View
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
							{ fontSize: 18 },
						]}
					>
						{language == "english"
							? "Password changed successfully!"
							: "Паролата е променена успешно!"}
					</Text>
					<TouchableOpacity
						style={globalStyles.button}
						onPress={close}
					>
						<Text style={globalStyles.buttonText}>OK</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
