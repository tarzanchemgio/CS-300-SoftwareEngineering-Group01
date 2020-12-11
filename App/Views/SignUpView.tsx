import { styles } from "../Shares/styles";
import React, { useState, Component } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

export function SignUpView({ navigation }: any) {
	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Image source={require("../Resources/Images/AR.png")} />
				<Image source={require("../Resources/Images/money-tree.png")} />
			</View>

			<View></View>
		</View>
	);
}
