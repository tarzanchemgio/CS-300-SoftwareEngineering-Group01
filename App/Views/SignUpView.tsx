import { styles } from "../Shares/styles";
import React, { useState, Component } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Dimensions,
	Pressable,
	Keyboard,
	TouchableHighlightComponent,
	TouchableNativeFeedback,
	Modal,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Platform } from "react-native";
import {
	GestureResponderEvent,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";

import { User } from "../Models/User";
import { SignUpViewModel } from "../ViewModels/SignUpViewModel";

const { height, width } = Dimensions.get("window");

export function SignUpView({ navigation }: any) {
	const signUpViewModel = new SignUpViewModel();

	const [user, setUser] = useState(new User());

	// For date of birth
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [isHinted, setHinted] = useState(false);

	const onDateSelected = (event: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || dateOfBirth;
		setShowDatePicker(Platform.OS === "ios");
		if (selectedDate !== undefined) {
			setDateOfBirth(currentDate);
			setHinted(true);

			user.dateOfBirth = selectedDate.toDateString();
		}

		// console.log(`DoB: ${user.dateOfBirth}`);
	};

	const [msg, setMsg] = useState("");

	const [modalVisible, setModalVisible] = useState(false);
	const [modalText, setModalText] = useState("");

	const validateInput = (usr: User) => {
		if (
			usr.username === "" ||
			usr.password === "" ||
			usr.email === "" ||
			usr.phone === ""
		) {
			throw "Username, password, email and phone number must not empty!";
		}
	};

	const signUpButtonHandler = async (usr: User) => {
		try {
			validateInput(usr);
			let isSuccess = await signUpViewModel.signUpUser(usr);
			if (isSuccess) {
				setModalVisible(true);
				setModalText("Sign up successfully");
			}
		} catch (exception) {
			setMsg(exception);
			setTimeout(() => setMsg(""), 3000);
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			accessible={false}
		>
			<View
				style={[
					styles.container,
					{ paddingVertical: height * 0.05, backgroundColor: "#0459C5" },
				]}
			>
				<Modal animationType="slide" transparent={true} visible={modalVisible}>
					<View style={[styles.container]}>
						<View style={signUpStyles.modalViewStyle}>
							<Text
								style={{
									marginBottom: 15,
									textAlign: "center",
									fontSize: 20,
								}}
							>
								{modalText}
							</Text>
							<TouchableNativeFeedback
								onPress={() => {
									setModalVisible(false);
								}}
							>
								<Text style={[signUpStyles.button, { textAlign: "center" }]}>
									OK
								</Text>
							</TouchableNativeFeedback>
						</View>
					</View>
				</Modal>
				{/* Logo Group */}
				<View
					style={[
						styles.container,
						styles.logo,
						{ backgroundColor: "#0459C5" },
					]}
				>
					<Image source={require("../Resources/Images/AR.png")} />
					<Image source={require("../Resources/Images/money-tree.png")} />
				</View>

				<View>
					<View style={{ width: width * 0.9 }}>
						{/* Username & Password Group */}
						<View style={{ marginVertical: 5 }}>
							<TextInput
								style={signUpStyles.inputText}
								placeholder="User name"
								onChangeText={(username) => {
									user.username = username;
									setUser(user);

									// console.log(`Username: ${user.username}`);
								}}
							/>
							<TextInput
								style={signUpStyles.inputText}
								placeholder="Password"
								secureTextEntry={true}
								onChangeText={(pwd) => {
									user.password = pwd;
									setUser(user);

									// console.log(`Pwd: ${user.password}`);
								}}
							/>
						</View>

						{/* Basic information */}
						<View style={{ marginVertical: 5 }}>
							<TextInput
								style={signUpStyles.inputText}
								placeholder="Full name"
								onChangeText={(text) => {
									user.fullname = text;
									setUser(user);
								}}
							/>

							<View style={{ flexDirection: "row" }}>
								<View style={{ flex: 1.7 }}>
									<TouchableNativeFeedback
										onPress={() => {
											setShowDatePicker(true);
										}}
									>
										<View
											style={[
												{
													flexDirection: "row",
													backgroundColor: "white",
													justifyContent: "space-between",
													alignItems: "center",
												},
												signUpStyles.inputText,
											]}
										>
											<Text>
												{!isHinted && "Date of birth"}
												{isHinted && dateOfBirth.toDateString()}
												{"  "}
											</Text>
											<Icon
												name="calendar-week"
												color="#0459C5"
												size={18}
											></Icon>
										</View>
									</TouchableNativeFeedback>

									{showDatePicker && (
										<DateTimePicker
											value={dateOfBirth}
											mode="date"
											display="default"
											onChange={(
												event: any,
												selectedDate: Date | undefined
											) => {
												const currentDate = selectedDate || dateOfBirth;
												setShowDatePicker(Platform.OS === "ios");
												if (selectedDate !== undefined) {
													setDateOfBirth(currentDate);
													setHinted(true);

													user.dateOfBirth = currentDate.toDateString();
													setUser(user);
												}

												// console.log(`DoB: ${user.dateOfBirth}`);
											}}
											// dateFormat="day month year"
										/>
									)}
								</View>

								<View style={{ flex: 1 }}>
									<DropDownPicker
										style={signUpStyles.inputText}
										items={[
											{ label: "Male", value: 0 },
											{ label: "Female", value: 1 },
											{ label: "Custom", value: 2 },
										]}
										defaultValue={0}
										containerStyle={{ height: 45 }}
										itemStyle={[
											{
												justifyContent: "flex-start",
												alignItems: "center",
											},
										]}
										onChangeItem={(item, index) => {
											user.gender = item.value;
											setUser(user);

											// console.log(item);
											// console.log(user);
										}}
									></DropDownPicker>
								</View>
							</View>

							<TextInput
								style={signUpStyles.inputText}
								placeholder="Email"
								keyboardType="email-address"
								onChangeText={(text) => {
									user.email = text;
									setUser(user);

									// console.log(`Email: ${user.email}`);
								}}
							/>
							<TextInput
								style={signUpStyles.inputText}
								placeholder="Phone"
								keyboardType="phone-pad"
								onChangeText={(text) => {
									user.phone = text;
									setUser(user);

									// console.log(`Phone: ${user.phone}`);
								}}
							/>
							<Text style={signUpStyles.warningText}>{msg}</Text>
						</View>

						{/* SignUp button */}
						<TouchableNativeFeedback
							onPress={() => {
								console.log(user);
								signUpButtonHandler(user);
							}}
						>
							<View style={[signUpStyles.button, { marginVertical: 15 }]}>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 16,
										color: "#fff",
									}}
								>
									SIGN UP
								</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const signUpStyles = StyleSheet.create({
	inputText: {
		alignSelf: "stretch",
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		margin: 3,
		// borderWidth: 1,
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
	warningText: {
		color: "red",
		marginHorizontal: 10,
		fontSize: 10,
	},
});
