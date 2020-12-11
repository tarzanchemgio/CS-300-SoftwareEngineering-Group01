import { Button, StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../Shares/styles";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginViewModel } from "../ViewModels/LoginViewModel";
import { StackScreenProps } from "@react-navigation/stack";

export function LoginView({ navigation }: any) {
	const loginViewModel = new LoginViewModel();

	// const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<View style={[styles.logo, loginStyle.loginLogo]}>
					<Image source={require("../Resources/Images/AR.png")} />
					<Image source={require("../Resources/Images/money-tree.png")} />
				</View>
			</View>

			<View style={styles.container}>
				<Text>Login View</Text>
				<Button
					title="Sign Up"
					onPress={() => navigation.navigate("SignUpView")}
				/>
				<Button
					title="Login v222222"
					onPress={() => navigation.navigate("InnerView")}
				/>
			</View>
		</View>
	);
}

const loginStyle = StyleSheet.create({
	loginLogo: {},
});

/* MONEY TREE */

/* MONEY TREE */
