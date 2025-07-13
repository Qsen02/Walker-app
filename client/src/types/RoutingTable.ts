import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RouteTypes = {
	Home: undefined;
	Register: undefined;
	Login: undefined;
	Steps: { userId: string };
	Water: { userId: string };
	StepsDetails: { stepsId: string };
	WaterDetails: { waterId: string };
};

export type NavigationType=NativeStackNavigationProp<RouteTypes>