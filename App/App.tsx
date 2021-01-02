import "react-native-gesture-handler"; // THIS GUY MUST BE ON TOP

import { LogBox, Route } from "react-native";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
	createDrawerNavigator,
	useIsDrawerOpen,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import { styles } from "./Shares/styles";
import { LoginView } from "./Views/LoginView";
import { SignUpView } from "./Views/SignUpView";
import { TransactionsView } from "./Views/TransactionsView";
import { ReportView } from "./Views/ReportView";
import { LearnView } from "./Views/LearnView";
import { AccountView } from "./Views/AccountView";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function OuterView() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="LoginView" component={LoginView} />
			<Stack.Screen name="SignUpView" component={SignUpView} />
		</Stack.Navigator>
	);
}

function InnerView() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: string = "";
					if (route.name === "Transactions") {
						iconName = "ticket-alt";
					} else if (route.name === "Report") {
						iconName = "chart-pie";
					} else if (route.name === "Learn") {
						iconName = "book";
					} else if (route.name === "Account") {
						iconName = "user-circle";
					}

					color = focused ? "#0459C5" : "gray";

					return <Icon name={iconName} color={color} size={20}></Icon>;
				},
			})}
			initialRouteName="Transactions"
		>
			<Tab.Screen name="Transactions" component={TransactionsView} />
			<Tab.Screen name="Report" component={ReportView} />
			<Tab.Screen name="Learn" component={LearnView} />
			<Tab.Screen name="Account" component={AccountView} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="OuterView" edgeWidth={20}>
				<Drawer.Screen name="OuterView" component={OuterView} />
				<Drawer.Screen name="InnerView" component={InnerView} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
