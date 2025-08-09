import { RouteProp, useRoute } from "@react-navigation/native";
import { Routes } from "../../types/RoutingTable";
import { ActivityIndicator, Text, View } from "react-native";
import { useGetOnlyUser } from "../../hooks/useUser";
import { useUserThemeContext } from "../../contexts/user_theme_context";
import { globalStyles } from "../../../globalStyles";

export default function Profile() {
	const { theme, language } = useUserThemeContext();
	const route = useRoute<RouteProp<Routes, "Profile">>();
	const { userId } = route.params;
	const { user, setUser, loading, error } = useGetOnlyUser(null, userId);

	return (
		<>
			{loading && !error ? (
				<ActivityIndicator
					size={60}
					color="rgba(6,173,0,1)"
					style={globalStyles.spinner}
				/>
			) : !loading && error ? (
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
				<View>
					<Text>User id: {userId}</Text>
				</View>
			)}
		</>
	);
}
