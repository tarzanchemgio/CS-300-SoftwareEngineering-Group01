import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

import { User } from "../Models/User";

export class SignUpViewModel {
	constructor() {}

	async signUpUser(user: User): Promise<boolean> {
		try {
			let dirPath = FileSystem.documentDirectory + "/users/";
			// console.log(`path: ${dirPath}`);

			// For test
			// FileSystem.deleteAsync(dirPath, { idempotent: true }).then(() => {
			// 	console.log(`Delete: ${dirPath}`);
			// });

			let dirInfo = await FileSystem.getInfoAsync(dirPath);
			// console.log(`path info: ${JSON.stringify(dirInfo, null, 2)}`);

			if (!dirInfo.exists) {
				await FileSystem.makeDirectoryAsync(dirPath);
			}

			let items = await FileSystem.readDirectoryAsync(dirPath);
			// console.log(`items: ${JSON.stringify(items, null, 2)}`);

			let userJson = (await items).find((val, idx) => {
				if (val === user.username + ".json") {
					return true;
				}
				return false;
			});

			if (userJson !== undefined) {
				throw "User is already exist!";
			} else {
				userJson = `${dirPath}/${user.username}.json`;

				// user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5));
				user.password = await Crypto.digestStringAsync(
					Crypto.CryptoDigestAlgorithm.SHA256,
					user.password
				);

				// console.log(`Writing to ${userJson}: ${JSON.stringify(user, null, 2)}`);

				await FileSystem.writeAsStringAsync(
					`${userJson}`,
					JSON.stringify(user, null, 4)
				);
			}
		} catch (e) {
			console.log(e);
			throw e;
		}
		return true;
	}
}
