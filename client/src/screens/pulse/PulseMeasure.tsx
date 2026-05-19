import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../globalStyles";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { pulseMeasureStyles } from "./PulseMeasureStyles";
import { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCreatePulse, useMeasurePulse } from "../../hooks/usePulse";
import { getPulseStatus } from "../../utils/pulseHelper";

export default function PulseMeasure() {
	const cameraRef = useRef(null);
	const { theme, language } = useUserThemeContext();
	const navigation = useNavigation<NavigationProp<Routes>>();
	const route = useRoute<RouteProp<Routes, "Pulse">>();
	const [camera, setCamera] = useState({
		active: false,
		torch: false,
	});
	const { userId } = route.params;
	const [permission, requestPermission] = useCameraPermissions();
	const [isMeasured, setMeasured] = useState(false);
	const { bpm, bpmRef, resetPulse } = useMeasurePulse(camera.active);
	const createPulse = useCreatePulse();

	async function openCamera() {
		resetPulse();
		setMeasured(false);
		setCamera((prev) => ({ ...prev, active: true }));

		setTimeout(async () => {
			setCamera((prev) => ({ ...prev, active: false }));
			setMeasured(true);
			await createPulse(userId, { value: bpmRef.current });
		}, 10000);
	}

	useEffect(() => {
		if (!permission?.granted) {
			requestPermission();
		}
	}, []);

	function showAllPulses() {
		navigation.navigate("AllPulses", { userId: userId });
	}

	return (
		<>
			{camera.active && (
				<CameraView
					ref={cameraRef}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 1000,
					}}
					enableTorch={true}
					facing="back"
				/>
			)}
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.navigate("Home")}
			>
				<FontAwesome6
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			<View
				style={[
					theme == "light"
						? globalStyles.whiteThemeNormal
						: globalStyles.darkThemeNormal,
					pulseMeasureStyles.wrapper,
				]}
			>
				<View style={pulseMeasureStyles.buttonWrapper}>
					<TouchableOpacity
						style={globalStyles.button}
						onPress={showAllPulses}
					>
						<Text style={globalStyles.buttonText}>
							{language === "bulgarian"
								? "Измервания"
								: "Measurements"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={globalStyles.button}
						onPress={openCamera}
					>
						<Text style={globalStyles.buttonText}>
							{language === "bulgarian"
								? "Измери пулс"
								: "Pulse measure"}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={pulseMeasureStyles.measureWrapper}>
					{!isMeasured ? (
						<Text
							style={[
								theme === "dark"
									? { color: "white" }
									: { color: "black" },
								pulseMeasureStyles.measureWrapperText,
							]}
						>
							{language === "bulgarian"
								? "Измерете пулса си тук..."
								: "Measure your pulse here..."}
						</Text>
					) : (
						<Text
							style={[
								theme === "dark"
									? { color: "white" }
									: { color: "black" },
								pulseMeasureStyles.measureWrapperText,
							]}
						>
							{language === "bulgarian"
								? "Резултат от измерването:"
								: "Measurement result:"}
						</Text>
					)}
					<FontAwesome6 name="heart-pulse" size={70} color="red" />
					{isMeasured && (
						<>
							<Text
								style={[
									theme === "dark"
										? { color: "white" }
										: { color: "black" },
									pulseMeasureStyles.measureWrapperText,
								]}
							>
								{bpm} BPM
							</Text>
							<Text
								style={[
									theme === "dark"
										? { color: "white" }
										: { color: "black" },
									pulseMeasureStyles.measureWrapperText,
								]}
							>
								{getPulseStatus(bpm, language).text}
							</Text>
							<Text
								style={[
									theme === "dark"
										? { color: "white" }
										: { color: "black" },
									pulseMeasureStyles.measureWrapperText,
								]}
							>
								{getPulseStatus(bpm, language).description}
							</Text>
						</>
					)}
				</View>
			</View>
		</>
	);
}
