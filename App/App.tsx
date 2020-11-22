import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
	const [count, setCount] = useState(0);

	function increase() {
		let n = 15;
		setCount(count + 1);
	}

	return (
		<View style={styles.container}>
			<Text>Hello! {count}</Text>
			<Button
				title="Increase"
				onPress={() => {
					increase();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
