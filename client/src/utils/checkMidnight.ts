import * as TaskManager from "expo-task-manager";
import * as BackgoundFetch from "expo-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSteps } from "../api/stepsService";
import { createWater } from "../api/waterService";

const CHECK_MIDNIGHT = "SEND_SERVER_REQUEST_AT_MIDNINGHT";

TaskManager.defineTask(CHECK_MIDNIGHT, async () => {
	try {
		const today = new Date().toDateString();
		const lastRun = await AsyncStorage.getItem("lastMidnightRequest");

		if (lastRun === today) {
			return BackgoundFetch.BackgroundFetchResult.NoData;
		}

		await createSteps();
		await createWater();

		await AsyncStorage.setItem("lastMidnightRequest", today);

		return BackgoundFetch.BackgroundFetchResult.NewData;
	} catch (err) {
		return BackgoundFetch.BackgroundFetchResult.Failed;
	}
});

export async function registerBackgroundTask() {
	try {
		const isRegistered =
			await TaskManager.isTaskRegisteredAsync(CHECK_MIDNIGHT);

		if (!isRegistered) {
			await BackgoundFetch.registerTaskAsync(CHECK_MIDNIGHT, {
				minimumInterval: 60 * 15,
				stopOnTerminate: false,
				startOnBoot: true,
			});

			console.log("Background task registered");
		}
	} catch (err) {
		console.log("Failed to register task", err);
	}
}
