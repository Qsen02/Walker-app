import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { globalStyles } from "../../../../globalStyles";
import { useState } from "react";
import InputField from "../../../commons/input_field/InputField";
import { addWaterStyles } from "./AddWaterStyles";

interface ErrorModalProps {
	visible: boolean;
	visibleHanlder: React.Dispatch<React.SetStateAction<boolean>>;
	theme: "light" | "dark" | undefined;
	language: "bulgarian" | "english" | undefined;
}

export default function AddWater({
	visible,
	visibleHanlder,
	theme,
	language,
}: ErrorModalProps) {
	const [formValues, setFormValues] = useState({
		waterCount: "",
	});

	function close() {
		visibleHanlder(false);
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
					<InputField
						title={`${
							language == "english"
								? "Enter amount of water (in ml)"
								: "Въведи количество вода (в мл)"
						}`}
						changeHanlder={(e: string) =>
							setFormValues({ ...formValues, waterCount: e })
						}
						value={formValues.waterCount}
						theme={theme}
						keyboardType="numeric"
					/>
					<View style={addWaterStyles.buttonWrapper}>
						<TouchableOpacity style={globalStyles.button}>
							<Text style={globalStyles.buttonText}>
								{language == "english" ? "ADD" : "ДОБАВИ"}
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
