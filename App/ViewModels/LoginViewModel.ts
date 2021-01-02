import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

import { User } from "../Models/User";

export class LoginViewModel {
	public async login(username: string, pass: string): Promise<User | null> {
		console.log(`Login with: [${username}; ${pass}]`);
		if (username === "" || pass === "") {
			return null;
		}

		let dirPath = FileSystem.documentDirectory + "/users";
		console.log(`path: ${dirPath}`);

		let dirInfo = await FileSystem.getInfoAsync(dirPath);

		if (!dirInfo.exists) {
			await FileSystem.makeDirectoryAsync(dirPath);
		}

		let items = await FileSystem.readDirectoryAsync(dirPath);
		console.log(`items: ${JSON.stringify(items, null, 2)}`);

		let userJson = (await items).find((val, idx) => {
			if (val === username + ".json") {
				return true;
			}
			return false;
		});

		if (userJson === undefined) {
			return null;
		} else {
			userJson = `${dirPath}/${userJson}`;
		}

		let user: User | null = null;

		console.log(`Read: ${userJson}`);
		let jsonStr = await FileSystem.readAsStringAsync(userJson);

		console.log(`Content: ${userJson}`);

		user = JSON.parse(jsonStr);
		if (user !== null) {
			let hash = await Crypto.digestStringAsync(
				Crypto.CryptoDigestAlgorithm.SHA256,
				pass
			);
			if (hash !== user.password) {
				return null;
			}
		}
		return user;
	}
}
