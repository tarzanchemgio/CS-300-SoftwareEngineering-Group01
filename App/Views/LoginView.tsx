import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Dimensions,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	TouchableNativeFeedback,
	Modal,
} from "react-native";
// import {Button} from "React-bootstrap/Button"
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { color } from "react-native-reanimated";

import { styles } from "../Shares/styles";
import { User } from "../Models/User";
import { LoginViewModel } from "../ViewModels/LoginViewModel";

// import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap and its default variables
// import '~bootstrap/scss/bootstrap.scss';

export function LoginView({ navigation }: any) {
	const loginViewModel = new LoginViewModel();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { height, width } = Dimensions.get("window");

	const [msg, setMsg] = useState("");

	const loginButtonHandler = async (username: string, pass: string) => {
		let usr = await loginViewModel.login(username, pass);
		console.log(`User recceived: ${JSON.stringify(usr, null, 4)}`);
		if (usr === null) {
			setMsg("Invalid username or password!");
			setTimeout(() => {
				setMsg("");
			}, 3000);
			// setModalVisible(true);
		} else {
			navigation.navigate("InnerView", { user: usr });
		}
	};

	// const navigation = useNavigation();
	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			accessible={false}
		>
			<View
				style={[
					styles.container,
					{ justifyContent: "flex-start", backgroundColor: "#0459C5" },
				]}
			>
				<View
					style={[
						{
							height: "26%", //logo view
							justifyContent: "flex-end",
							width: "100%",
							// borderColor: "green",
							// borderWidth: 3,
						},
					]}
				>
					<View style={[styles.logo, loginStyle.loginLogo]}>
						<Image source={require("../Resources/Images/AR.png")} />
						<Image source={require("../Resources/Images/money-tree.png")} />
					</View>
				</View>

				<View
					style={[
						{
							//username and password space
							justifyContent: "flex-start",
							marginTop: "7%",
							// borderColor: "green",
							// borderWidth: 3,
						},
					]}
				>
					<TextInput
						style={[loginStyle.textBox, { width: width * 0.8 }]}
						placeholder="Username"
						onChangeText={(text) => {
							setUsername(text);
						}}
					/>
					<TextInput
						style={[loginStyle.textBox, { width: width * 0.8 }]}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={(text) => {
							setPassword(text);
						}}
					/>
					{/* Warning text */}
					<Text style={loginStyle.warningText}>{msg}</Text>

					{/* Forgot password */}
					<TouchableNativeFeedback
						onPress={() => {
							"navigate here";
						}}
					>
						<View style={{ alignSelf: "flex-end" }}>
							<Text style={{ color: "white", textDecorationLine: "underline" }}>
								Forgot your password ?
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>

				{/* Login */}
				<TouchableNativeFeedback
					onPress={() => {
						loginButtonHandler(username, password);
					}}
				>
					<View
						style={{
							backgroundColor: "orange",
							alignItems: "center", // Sign in button space
							justifyContent: "center",
							borderRadius: 15,
							width: width * 0.8,
							padding: "1%",
							marginTop: "5%",
						}}
					>
						<Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
							SIGN IN
						</Text>
					</View>
				</TouchableNativeFeedback>

				{/* SignUp */}
				<TouchableNativeFeedback
					onPress={() => {
						navigation.navigate("SignUpView");
					}}
				>
					<View
						style={{
							// alignSelf: "flex-start",
							width: width * 0.8,
							marginTop: 5,
						}}
					>
						<Text style={{ color: "white", textDecorationLine: "underline" }}>
							Dont't have an account ?
						</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		</TouchableWithoutFeedback>
	);
}

const loginStyle = StyleSheet.create({
	loginLogo: {},

	textBox: {
		alignSelf: "stretch",
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		margin: 5,
	},
	modalViewStyle: {
		flex: 0.5,
		alignItems: "center",
		justifyContent: "center",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	button: {
		alignSelf: "stretch",
		padding: 10,
		backgroundColor: "#F2B824",
		margin: 3,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	warningText: {
		color: "red",
		marginLeft: 10,
		fontSize: 10,
	},
});

/* MONEY TREE */

/* MONEY TREE */
