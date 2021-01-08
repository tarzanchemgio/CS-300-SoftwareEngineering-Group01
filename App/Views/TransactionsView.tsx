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

export function TransactionsView({ navigation }: any) {
	return (
		<SafeAreaView style={[styles.container]}>
			<View
				style={[
					styles.container,
					{
						flex: 21,
						justifyContent: "flex-start",
						// borderColor: "blue",
						// borderWidth: 5,
						width: "100%",
					},
				]}
			>
				<View //total cash
					style={[
						{
							height: "12%",

							justifyContent: "flex-end",
							width: "100%",
							// borderColor: "red",
							// borderWidth: 3,
						},
					]}
				>
					<View style={{ justifyContent: "center", flexDirection: "row" }}>
						<View
							style={{
								backgroundColor: "orange",
								width: 25,
								height: 25,
								borderRadius: 100,
							}}
							//--------------icon of total cash-----
						></View>

						<View style={{ marginRight: "auto", marginLeft: 5 }}>
							<Text style={{ color: "#b5b2b0" }}>monthly</Text>
							<Text style={{ fontSize: 18 }}>"this month cash"</Text>
						</View>
					</View>
				</View>

				<View //in flow out flow
					style={[
						{
							height: "27%",
							justifyContent: "flex-start",
							width: "100%",
							// borderColor: "purple",
							// borderWidth: 3,
						},
					]}
				>
					<View style={{ flexDirection: "row", height: "25%", marginTop: 10 }}>
						<Text style={{ paddingLeft: 10, color: "#b5b2b0" }}>Inflow</Text>
						<Text style={{ marginLeft: "auto" }}> value </Text>
					</View>
					<View style={{ flexDirection: "row", height: "25%" }}>
						<Text style={{ paddingLeft: 10, color: "#b5b2b0" }}>Outflow</Text>
						<View
							style={{
								marginLeft: "auto",
								borderBottomColor: "#cccbca",
								borderBottomWidth: 1,
								marginBottom: 5,
								paddingRight: 3,
							}}
						>
							<Text> value</Text>
						</View>
					</View>
					<View style={{ height: "25%" }}>
						<Text style={{ marginLeft: "auto" }}> value </Text>
					</View>
				</View>

				<View //detail
					style={[
						{
							height: "60%",
							justifyContent: "flex-end",
							width: "100%",
							// borderColor: "pink",
							// borderWidth: 3,
						},
					]}
				></View>
			</View>
			<View style={{ flex: 1 }}>
				<View
					style={{
						//add transaction button
						backgroundColor: "green",
						width: 30,
						height: 30,
						borderRadius: 100,
						alignItems: "center",
						justifyContent: "center",
						borderColor: "orange",
						borderWidth: 5,

						// alignSelf : 'flex-end',
						// alignSelf : 'center',
						// flex : 1
					}}
				>
					<Text style={{ fontSize: 20 }}>+</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
