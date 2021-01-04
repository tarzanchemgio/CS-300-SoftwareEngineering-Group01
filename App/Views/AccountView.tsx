import { styles } from "../Shares/styles";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export function AccountView({ navigation, route }: any) {
	let params = JSON.stringify(route.params.user, null, 4);
	console.log(`params: ${JSON.stringify(route.params, null, 4)}`);
	return (
		<View style={styles.container}>
			<Text>AccountView</Text>
			<Text>{params}</Text>
		</View>
	);
}
