import { ParamListBase } from "@react-navigation/native";

export interface Routes extends ParamListBase {
	AuthGate: { screen: string };
	Home: undefined;
	Settings: undefined;
	Register: undefined;
	Login: undefined;
	Steps: { userId: string };
	Water: { userId: string };
	StepsDetails: { stepsId: string };
	WaterDetails: { waterId: string };
	Profile: { userId: string };
}
