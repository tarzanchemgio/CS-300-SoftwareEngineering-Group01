import { styles } from "../Shares/styles";
import React, { useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Lesson } from "../Models/Lesson";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { createStackNavigator } from "@react-navigation/stack";
import { Quiz } from "../Models/Quiz";

const LearnStack = createStackNavigator();
const { height, width } = Dimensions.get("window");

interface ILessonItem {
	lesson: Lesson;
	requireImg: any;
}

const LessonItem = (iLesson: ILessonItem, { navigation, route }: any) => {
	return (
		<TouchableNativeFeedback
			onPress={() => {
				// console.log(`Topic pressed!`);
				navigation.navigate("QuestionsView", {
					questions: iLesson.lesson.quizs,
					topic: iLesson.lesson.topic,
				});
			}}
		>
			<View
				style={[
					styles.container,
					{
						margin: 5,
						borderRadius: 10,
						padding: 10,
						borderWidth: 0.5,
					},
				]}
			>
				<Image
					source={iLesson.requireImg}
					style={{
						width: width,
						height: height * 0.15,
						resizeMode: "center",
						marginBottom: 10,
					}}
				/>
				<Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 15 }}>
					{iLesson.lesson.topic}
				</Text>
			</View>
		</TouchableNativeFeedback>
	);
};

const LessonsView = ({ navigation, route }: any) => {
	let lessons: ILessonItem[] = [
		{
			lesson: require("../Resources/Lessons/Demand, Supply & Price.json"),
			requireImg: require("../Resources/Images/demand.png"),
		},
		{
			lesson: require("../Resources/Lessons/Demand, Supply & Price.json"),
			requireImg: require("../Resources/Images/lesson02.png"),
		},
		{
			lesson: require("../Resources/Lessons/Demand, Supply & Price.json"),
			requireImg: require("../Resources/Images/lesson03.png"),
		},
	];

	return (
		<View>
			<FlatList
				contentContainerStyle={{ padding: 5 }}
				data={lessons}
				keyExtractor={(item, index) => {
					return item.lesson.topic;
				}}
				renderItem={({ item }) => {
					// console.log(`item: ${JSON.stringify(item, null, 4)}`);
					return LessonItem(item, { navigation, route });
				}}
				numColumns={2}
			></FlatList>
		</View>
	);
};

const QuestionList = ({ navigation, route }: any) => {
	// Cannot update a component from inside the function body of a different component.
	// let topic = route.params.topic;
	// console.log(`Topic: ${topic}`);
	// navigation.setOptions({ tittle: topic });

	let questions: Quiz[] = route.params.questions;
	// console.log(`questions: ${JSON.stringify(questions, null, 4)}`);

	return (
		<View>
			<FlatList
				data={questions}
				keyExtractor={(item: Quiz) => item.question}
				renderItem={({ item }) => {
					return (
						<TouchableNativeFeedback>
							<View
								style={{
									borderBottomColor: "black",
									borderBottomWidth: 0.5,
									paddingVertical: 20,
								}}
							>
								<Text
									numberOfLines={1}
									style={{
										fontSize: 25,
										marginVertical: 10,
										marginHorizontal: 15,
									}}
								>
									{item.question}
								</Text>
							</View>
						</TouchableNativeFeedback>
					);
				}}
			></FlatList>
		</View>
	);
};

export function LearnView() {
	return (
		<LearnStack.Navigator>
			<LearnStack.Screen
				name="LessonsView"
				options={{ title: "Lessons" }}
				component={LessonsView}
			/>
			<LearnStack.Screen
				name="QuestionsView"
				options={({ route }: any) => ({ title: route.params.topic })}
				component={QuestionList}
			/>
		</LearnStack.Navigator>
	);
}
