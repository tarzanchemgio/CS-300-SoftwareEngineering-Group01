import { styles } from "../Shares/styles";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image, TouchableNativeFeedback , FlatList} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { User } from "../Models/User";

const AccountStack = createStackNavigator();
const { height, width } = Dimensions.get("window");

const ChangeInformationView = ({ navigation, route }: any) => {
	return (
		<View style={styles.container}>
			<Text style={[accountStyle.textCenter, {fontSize: 20}]}>CHANGE INFORMATION</Text>
		</View>
	)
}

const ChangePasswordView = ({ navigation, route }: any) => {
	return (
		<View style={styles.container}>
			<Text style={[accountStyle.textCenter, {fontSize: 20}]}>CHANGE PASSWORD</Text>
		</View>
	)
}

const SupportView = ({ navigation, route }: any) => {
	return (
		<View style={styles.container}>
			<Text style={[accountStyle.textCenter, {fontSize: 20}]}>SUPPORT</Text>
		</View>
	)
}

const FeedbackView = ({ navigation, route }: any) => {
	return (
		<View style={styles.container}>
			<Text style={[accountStyle.textCenter, {fontSize: 20}]}>FEEDBACK</Text>
		</View>
	)
}

const CommunityView = ({ navigation, route }: any) => {
	return (
		<View style={styles.container}>
			<Text style={[accountStyle.textCenter, {fontSize: 20}]}>COMMUNITY</Text>
		</View>
	)
}

const AccountMainView = ({ navigation, route }: any) => {
	const user = route.params.user;

	let screenName: string[] = ["ChangePasswordView", "SupportView", "FeedbackView", "CommunityView"];
	let option: string[] = ["Change password", "Support", "Feedback", "Community"];
	let nameIcon: string[] = ["onepassword", "help-box", "comment-alert-outline", "google-circles-communities"];

	return (
		<View style={[styles.container]}>



			<View style={{flex: 0.3, width: "100%", backgroundColor: "#0459C5"}}>
				
			</View>

			<View style={ accountStyle.form }>
				<View style={accountStyle.imageAvatarWrapper}>
					<Image source={require("../Resources/Images/avatar.png")} style={accountStyle.imageAvatar} resizeMode="center"/>
				</View>


				<View style={accountStyle.editImageAvatar}>
					<Feather name="camera" size={22} color="black" style={{alignSelf: "center"}}/>
				</View>
				
				<View style={accountStyle.inforWrapper}>
					<Text style={[accountStyle.inforName, accountStyle.textCenter]}>{user.fullname}</Text>
					<Text  style={[accountStyle.textCenter]}>{user.email}</Text>
					<Text  style={[accountStyle.textCenter]}>{user.phone}</Text>
				</View>

				<TouchableNativeFeedback
					onPress={() => {
						navigation.navigate("ChangeInforView", { });
						}}
				>
					<View
						style={[
							accountStyle.button,
							{ backgroundColor: "#F2B824" },
							]}
					>
						<Text style={{ fontWeight: "bold" }}>Change Information</Text>
					</View>
				</TouchableNativeFeedback>

				<View>
					<FlatList
						style={{paddingTop: 20}}
						data={option}
						keyExtractor={(item, idx) => item}
						renderItem={({ item, index, separators }) => {
							return (
								<TouchableNativeFeedback
									onPress={() => {
										navigation.navigate(screenName[index], {})
										}}
								>
									<View style={accountStyle.option}>
										<MaterialCommunityIcons name={nameIcon[index]} size={30} color="#F2B824" />
										<Text style={{paddingLeft: 20, fontSize: 16}}>{ item }</Text>
									</View>
								</TouchableNativeFeedback>
							)
						}}
				>
					</FlatList>
				</View>
				

				<TouchableNativeFeedback
					onPress={() => {
						//Logout handler
						}}
				>
					<View
						style={[
							accountStyle.button,
							{ backgroundColor: "#0459C5" },
							]}
					>
						<Text style={{ fontWeight: "bold" , color: "white"}}>Logout Account</Text>
					</View>
				</TouchableNativeFeedback>

			</View>


			

			<View style={{flex: 0.7, width: "100%",  backgroundColor: "#FFFFFF"}}>
				
			</View>
		</View>
	)
}

export function AccountView({ navigation, route }: any) {
	const user = route.params.user as User;
	console.log("user"+ JSON.stringify(user));
	return (
		<AccountStack.Navigator>
			<AccountStack.Screen
				name="AccountMainView"
				options={{ title: "Account Setting" }}
				component={AccountMainView}
				initialParams={{ user: route.params.user }}/>
			
			<AccountStack.Screen
				name="ChangeInforView"
				options={{ title: "Change information" }}
				component={ChangeInformationView} />
			
			<AccountStack.Screen
				name="ChangePasswordView"
				options={{ title: "Change password" }}
				component={ChangePasswordView} />
			
			<AccountStack.Screen
				name="SupportView"
				options={{ title: "Support" }}
				component={SupportView} />
			
			<AccountStack.Screen
				name="FeedbackView"
				options={{ title: "Feedback" }}
				component={FeedbackView} />
			
			<AccountStack.Screen
				name="CommunityView"
				options={{ title: "Community" }}
				component={CommunityView}/>

		</AccountStack.Navigator>
	);
}

const accountStyle = StyleSheet.create({

	form: {
		width: "90%",
		height: "85%",
		backgroundColor: "#FFFFFF",
		position: "absolute",
		top: 100,
		borderRadius: 20,
		zIndex: 1000,
		alignContent: "center"
	},

	imageAvatarWrapper: {
		alignSelf: "center",
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: "#000000",
		overflow: "hidden",
		position: "absolute",
		top: -60
	},

	editImageAvatar: {
		position: "absolute",
		alignSelf: "center",
		top: 25,
		left: 205,
		width: 34,
		height: 34,
		borderRadius: 15,
		backgroundColor: "#f0f0f0",
		alignContent: "center",
		justifyContent: "center"
	},

	imageAvatar: {
		flex: 1,
		width: undefined,
		height: undefined
	},

	inforWrapper: {
		alignSelf: "center",
		paddingTop: 80,
	},

	textCenter: {
		textAlign: "center",
	},

	inforName: {
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 5
	},

	editInforBtn: {
		paddingTop: 10,
	},

	button: {
		width: "60%",
		alignSelf: "center",
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		
	},

	option: {
		marginTop: 5,
		marginBottom: 5,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	}

});
