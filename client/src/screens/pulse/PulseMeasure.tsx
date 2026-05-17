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
import {
	Camera,
	useCameraDevice,
	useCameraPermission,
	useFrameOutput,
} from "react-native-vision-camera";
import { FontAwesome6 } from "@expo/vector-icons";
import {
	calculateAverageRed,
	calculateBPM,
	detectPeaks,
	smoothSignal,
} from "../../utils/pulseHelper";
import { useResizePlugin } from "vision-camera-resize-plugin";

export default function PulseMeasure() {
	const { theme, language } = useUserThemeContext();
	const navigation = useNavigation<NavigationProp<Routes>>();
	const route = useRoute<RouteProp<Routes, "Pulse">>();
	const device = useCameraDevice("back");
	const [camera, setCamera] = useState({
		active: false,
		torch: false,
	});
	const { userId } = route.params;
	const { requestPermission } = useCameraPermission();
	const signalBuffer = useRef<number[]>([]);
	const [isMeasured, setMeasured] = useState(false);
	const [bpm, setBpm] = useState(0);
	const { resize } = useResizePlugin();

	const frameOutput = useFrameOutput({
		onFrame(frame) {
			"worklet";

			try {
				const resized = resize(frame, {
					scale: {
						width: 32,
						height: 32,
					},
					pixelFormat: "rgb",
					dataType: "uint8",
				});

				const redAverage = calculateAverageRed(resized);
				signalBuffer.current.push(redAverage);
				if (signalBuffer.current.length > 300) {
					signalBuffer.current.shift();
				}
				const smoothed = smoothSignal(signalBuffer.current);
				const peaks = detectPeaks(smoothed);
				const bpm = calculateBPM(peaks, 30);
				setBpm(bpm);
			} finally {
				frame.dispose();
			}
		},
	});

	function openCamera() {
		setCamera((prev) => ({ ...prev, active: true }));

		setTimeout(() => {
			setCamera((prev) => ({ ...prev, active: false }));
			setMeasured(true);
		}, 10000);
	}

	useEffect(() => {
		(async () => {
			await requestPermission();
		})();
	}, []);

	return (
		<>
			{device && camera.active && (
				<Camera
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 1000,
					}}
					device={device}
					isActive={true}
					torchMode={camera.torch ? "on" : "off"}
					outputs={[frameOutput]}
					onPreviewStarted={() => {
						setCamera((prev) => ({
							...prev,
							torch: true,
						}));
					}}
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
					<TouchableOpacity style={globalStyles.button}>
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
					)}
				</View>
			</View>
		</>
	);
}
