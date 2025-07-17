import { Modal, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../globalStyles";

interface ErrorModalProps {
	message: string;
	visible: boolean;
	visibleHanlder: React.Dispatch<React.SetStateAction<boolean>>;
	messageHandler: React.Dispatch<React.SetStateAction<string>>;
	theme: "light" | "dark" | undefined;
}

export default function ErrorModal({
	message,
	visible,
	visibleHanlder,
	messageHandler,
	theme,
}: ErrorModalProps) {
	function close() {
		visibleHanlder(false);
		messageHandler("");
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
							globalStyles.modalText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{message}
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
