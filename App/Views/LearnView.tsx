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
	ScrollView,
	TouchableWithoutFeedback,
	OpaqueColorValue,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Lesson } from "../Models/Lesson";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { createStackNavigator } from "@react-navigation/stack";
import CheckBox from "expo-checkbox";

import { Quiz } from "../Models/Quiz";
import { set } from "react-native-reanimated";

const LearnStack = createStackNavigator();
const { height, width } = Dimensions.get("window");

interface ILessonItem {
	lesson: Lesson;
	requireImg: any;
}

function shuffle(array: any[]) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// A full screen modal
const QuestionModal = ({ navigation, route }: any) => {
	const quiz = route.params.question as Quiz;

	const anwsers: string[] = shuffle([
		...quiz.correctAnswers,
		...quiz.wrongAnswers,
	]);

	let selectedAnwsers: string[] = [];
	function AnwserCheckBox({ item }: any) {
		const [isChecked, setIsChecked] = useState(false);

		const onChecked = () => {
			if (!isChecked === true) {
				// checkedAnwsers.add(item);
				selectedAnwsers.push(item);
			} else {
				// checkedAnwsers.delete(item);
				selectedAnwsers.splice(selectedAnwsers.indexOf(item), 1);
			}

			setIsChecked(!isChecked);

			// console.log(
			// 	`selectedAnwsers: ${JSON.stringify(selectedAnwsers, null, 4)}`
			// );
		};

		return (
			<TouchableWithoutFeedback
				onPress={() => {
					onChecked();
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<CheckBox
						disabled={false}
						value={isChecked}
						onValueChange={(newValue) => {
							onChecked();
						}}
					/>
					<Text style={{ fontSize: 16 }}>{item}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	const [isWrong, setIsWrong] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<FlatList
				data={[quiz.question]}
				keyExtractor={(item, idx) => item}
				renderItem={({ item }) => {
					return (
						<View style={{ padding: 15, flex: 1 }}>
							<Text style={{ fontSize: 15 }}>{item}</Text>

							{/* Anwsers */}
							<FlatList
								style={{ marginTop: 10 }}
								data={anwsers}
								keyExtractor={(item, index) => item}
								renderItem={({ item }) => <AnwserCheckBox item={item} />}
							/>

							<View>
								{isWrong && (
									<Text style={{ color: "red", fontSize: 8 }}>
										Wrong anwsers!
									</Text>
								)}
								{isCorrect && (
									<Text style={{ color: "green", fontSize: 8 }}>Correct!</Text>
								)}
							</View>

							{/* Buttons */}
							<View style={{ flexDirection: "row", marginTop: 30 }}>
								<TouchableNativeFeedback
									onPress={() => {
										if (selectedAnwsers.length === quiz.correctAnswers.length) {
											quiz.correctAnswers.sort();
											console.log(
												`quiz.correctAnswers: ${JSON.stringify(
													quiz.correctAnswers,
													null,
													4
												)}`
											);

											selectedAnwsers.sort();
											console.log(
												`selectedAnwsers${JSON.stringify(
													selectedAnwsers,
													null,
													4
												)}`
											);

											let corrects = 0;
											for (let i = 0; i < selectedAnwsers.length; i++) {
												if (selectedAnwsers[i] !== quiz.correctAnswers[i]) {
													setIsWrong(true);
													setTimeout(() => setIsWrong(false), 1000);
												} else {
													corrects++;
												}
											}

											if (corrects == selectedAnwsers.length) {
												setIsWrong(false);
												setIsCorrect(true);
												setTimeout(() => navigation.goBack(), 500);
											}
										} else {
											setIsWrong(true);
											setTimeout(() => setIsWrong(false), 1000);
										}
									}}
								>
									<View
										style={[
											learnViewStyles.button,
											{ backgroundColor: "#F2B824" },
										]}
									>
										<Text style={{ fontWeight: "bold" }}>SUBMIT</Text>
									</View>
								</TouchableNativeFeedback>

								<TouchableNativeFeedback onPress={() => navigation.goBack()}>
									<View
										style={[
											learnViewStyles.button,
											{ backgroundColor: "#gray" },
										]}
									>
										<Text style={{ fontWeight: "bold" }}>CANCEL</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
};

const QuestionList = ({ navigation, route }: any) => {
	let questions: Quiz[] = route.params.questions;
	// console.log(`questions: ${JSON.stringify(questions, null, 4)}`);

	return (
		<View>
			<FlatList
				data={questions}
				keyExtractor={(item: Quiz) => item.question}
				renderItem={({ item }) => {
					return (
						<TouchableNativeFeedback
							onPress={() => {
								navigation.navigate("Question", { question: item });
							}}
						>
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

const LessonItem = (iLesson: ILessonItem) => {
	return (
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
					return (
						<TouchableNativeFeedback
							onPress={() => {
								// console.log(`Topic pressed!`);
								navigation.navigate("QuestionsView", {
									questions: item.lesson.quizs,
									topic: item.lesson.topic,
								});
							}}
						>
							{LessonItem(item)}
						</TouchableNativeFeedback>
					);
					// return LessonItem(item, { navigation, route });
				}}
				numColumns={2}
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
			<LearnStack.Screen name="Question" component={QuestionModal} />
		</LearnStack.Navigator>
	);
}

const learnViewStyles = StyleSheet.create({
	button: {
		alignSelf: "stretch",
		padding: 10,
		margin: 3,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		borderWidth: 1,
		borderColor: "black",
	},
});
