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
import { useAddWater } from "../../../hooks/useWater";
import { Water } from "../../../types/water";

interface ErrorModalProps {
	visible: boolean;
	visibleHanlder: React.Dispatch<React.SetStateAction<boolean>>;
	theme: "light" | "dark" | undefined;
	language: "bulgarian" | "english" | undefined;
	waterId: string;
	setWaterHanlder: React.Dispatch<React.SetStateAction<Water | null>>;
}

export default function AddWater({
	visible,
	visibleHanlder,
	theme,
	language,
	waterId,
	setWaterHanlder,
}: ErrorModalProps) {
	const [formValues, setFormValues] = useState({
		waterCount: "",
	});
	const addWater = useAddWater();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");

	function close() {
		visibleHanlder(false);
	}

	async function onAdd() {
		try {
			const waterCount = Number(formValues.waterCount);
			if (waterCount < 1) {
				throw new Error(
					`${
						language == "english"
							? "Water amount must be minimum 1 ml!"
							: "Количеството на водата трябва да бъде поне 1 мл"
					}`
				);
			}
			const updatedWater = await addWater(waterId, { waterCount });
			setWaterHanlder(updatedWater);
			visibleHanlder(false);
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
			return;
		}
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
					{isErr ? (
						<Text style={[globalStyles.errors, { color: "red" }]}>
							{errMessage}
						</Text>
					) : (
						""
					)}
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
						<TouchableOpacity
							style={globalStyles.button}
							onPress={onAdd}
						>
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
