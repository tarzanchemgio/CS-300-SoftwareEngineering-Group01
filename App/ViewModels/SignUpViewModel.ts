import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../Models/User";

export class SignUpViewModel {
	constructor() {}

	async signUpUser(user: User) {
		let userKey = "users/" + user.username;
		let tmp = await AsyncStorage.getItem(userKey);
		// Check user exist
		if (tmp !== null) {
			throw "User has already existed!";
		} else {
			await AsyncStorage.setItem(userKey, JSON.stringify(user));
		}
	}
}
