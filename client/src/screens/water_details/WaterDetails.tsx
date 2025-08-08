import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../types/RoutingTable";
import { useGetOneWater } from "../../hooks/useWater";
import { globalStyles } from "../../../globalStyles";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { waterDetailsStyles } from "./WaterDetailsStyles";
import { useState } from "react";
import AddWater from "./add_water/AddWater";

export default function WaterDetails() {
	const { theme, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "WaterDetails">>();
	const { waterId } = route.params;
	const { water,setWater, loading, error } = useGetOneWater(null, waterId);
	const navigation = useNavigation<NavigationProp<Routes>>();
	const [isFormVisible, setIsFormVisible] = useState(false);

	function showForm() {
		setIsFormVisible(true);
	}

	return (
		<>
			{loading && !error ? (
				<ActivityIndicator
					size={60}
					color="rgba(6,173,0,1)"
					style={globalStyles.spinner}
				/>
			) : (
				""
			)}
			{isFormVisible ? (
				<AddWater
					visible={isFormVisible}
					visibleHanlder={setIsFormVisible}
					theme={theme}
					language={language}
					waterId={waterId}
					setWaterHanlder={setWater}
				/>
			) : (
				""
			)}
			<TouchableOpacity
				style={globalStyles.arrowButton}
				onPress={() => navigation.navigate("Home")}
			>
				<Icon
					name="arrow-left"
					color={theme == "light" ? "black" : "white"}
					size={25}
				/>
			</TouchableOpacity>
			{error ? (
				<View
					style={[
						globalStyles.errorContainer,
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
					]}
				>
					<Text
						style={[
							globalStyles.errorText,
							theme == "light"
								? { color: "black" }
								: { color: "white" },
						]}
					>
						{language == "english"
							? "Server is not responding, please try again later!"
							: "Сървърът не отговаря, моля опитайте по късно!"}
					</Text>
				</View>
			) : (
				<View
					style={[
						theme == "light"
							? globalStyles.whiteThemeNormal
							: globalStyles.darkThemeNormal,
						waterDetailsStyles.wrapper,
					]}
				>
					<View style={waterDetailsStyles.buttonWrapper}>
						<TouchableOpacity
							style={globalStyles.button}
							onPress={showForm}
						>
							<Text style={globalStyles.buttonText}>
								{language == "english"
									? "ADD WATER"
									: "ДОБАВИ ВОДА"}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={globalStyles.button}>
							<Text style={globalStyles.buttonText}>
								{language == "english"
									? "LAST WATER DAYS"
									: "ПОСЛЕДНИ ДНИ"}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={waterDetailsStyles.contentWrapper}>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
							]}
						>
							{language == "english" ? "Date:" : "Дата:"}{" "}
							{water?.date}
						</Text>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
							]}
						>
							{language == "english"
								? "Amount of water you drank today:"
								: "Количеството вода, което сте изпили днес:"}
						</Text>
						<View style={waterDetailsStyles.waterContent}>
							<Icon name="droplet" size={40} color="skyblue" />
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									waterDetailsStyles.text,
									{ fontSize: 20 },
								]}
							>
								{water?.waterCount}{" "}
								{language == "english" ? "ml" : "мл"}
							</Text>
						</View>
					</View>
					<View style={waterDetailsStyles.contentWrapper}>
						{water && water.waterCount >= 1500 ? (
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									waterDetailsStyles.text,
								]}
							>
								{language == "english"
									? "Well done! You've drunk your required amount of water for the day."
									: "Браво! Изпили сте необходимото количество вода за деня."}
							</Text>
						) : (
							<Text
								style={[
									theme == "light"
										? { color: "black" }
										: { color: "white" },
									waterDetailsStyles.text,
								]}
							>
								{language == "english"
									? "You need to drink at least 1500 ml of water per day."
									: "Трябва да пиете поне 1500 мл вода на ден."}
							</Text>
						)}
					</View>
					<View style={waterDetailsStyles.contentWrapper}>
						<Text
							style={[
								theme == "light"
									? { color: "black" }
									: { color: "white" },
								waterDetailsStyles.text,
							]}
						>
							{language == "english"
								? "Don't forget to keep track of how much water you drink per day. Water helps maintain hydration, supports digestion, boosts energy, and keeps your skin healthy"
								: "Не забравяйте да следите какво количество вода пиете на ден. Водата подпомага хидратацията, подпомага храносмилането, подобрява енергията и поддържа кожата ви здрава."}
						</Text>
					</View>
				</View>
			)}
		</>
	);
}
