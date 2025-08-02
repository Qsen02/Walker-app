import * as TaskManager from "expo-task-manager";
import * as BackgoundFetch from "expo-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSteps } from "../api/stepsService";

const CHECK_MIDNIGHT = "SEND_SERVER_REQUEST_AT_MIDNINGHT";

TaskManager.defineTask(CHECK_MIDNIGHT, async () => {
	try {
		const now = new Date();
		const hour = now.getHours();
		const minute = now.getMinutes();
		const today = now.toDateString();

		const lastRun = await AsyncStorage.getItem("lastMidnightRequest");

		if (hour === 0 && minute === 0 && today != lastRun) {
			await createSteps();
			await AsyncStorage.setItem("lastMidnightRequest", today);
			console.log("Request send successfully at midnight!");
			return BackgoundFetch.BackgroundFetchResult.NewData;
		}

		return BackgoundFetch.BackgroundFetchResult.NoData;
	} catch (err) {
		console.log("Error in backgound task!");
		return BackgoundFetch.BackgroundFetchResult.Failed;
	}
});

export async function registrateBackgoundTask() {
	try {
		const isRegitrated = await TaskManager.isTaskRegisteredAsync(
			CHECK_MIDNIGHT
		);

		if (isRegitrated) {
			await BackgoundFetch.registerTaskAsync(CHECK_MIDNIGHT, {
				minimumInterval: 60 * 15,
				stopOnTerminate: false,
				startOnBoot: true,
			});
			console.log("Task was registrated successfull!");
		}
	} catch (err) {
		console.log("Task was not regitrated successfully");
		return;
	}
}
