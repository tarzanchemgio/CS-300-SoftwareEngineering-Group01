import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../Models/User";

export class LoginViewModel {
	public async login(username: string, pass: string): Promise<User | null> {
		if (username === "" || pass === "") {
			return null;
		}

		let userKey = "users/" + username;
		let userStr = await AsyncStorage.getItem(userKey);

		if (userStr === null) {
			return null;
		}

		let user = JSON.parse(userStr) as User;
		if (user.password !== pass) {
			return null;
		}

		return user;
	}
}
