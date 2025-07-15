import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Home: undefined;
	Register: undefined;
	Login: undefined;
	Steps: { userId: string };
	Water: { userId: string };
	StepsDetails: { stepsId: string };
	WaterDetails: { waterId: string };
	Profile: { userId: string };
};

export type NavigationType = NativeStackNavigationProp<RootStackParamList>;
