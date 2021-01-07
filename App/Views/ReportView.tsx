import { styles } from "../Shares/styles";
import React, { useState } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	Dimensions,
	ScrollView,
} from "react-native";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";

import { ReportViewModel } from "../ViewModels/ReportViewModel";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

const { height, width } = Dimensions.get("window");
const ReportStack = createStackNavigator();

const reportViewModel = new ReportViewModel();

const ChartsView = ({ navigation, route, period }: any) => {
	let currentDate = new Date(period);

	// Overview section
	const { requestTransactions, cost } = reportViewModel.getTransactions(
		currentDate
	);

	const { total, amount } = reportViewModel.getTotalCost();

	const periods = reportViewModel.getPeriodList();

	const overviewBarData = {
		labels: [
			`${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
			"Average",
		],
		datasets: [
			{
				data: [
					Math.ceil(cost / 1000),
					Math.ceil(total / periods.length / 1000),
				],
			},
		],
	};

	// Cost of Category section
	let categories = [
		"Transportation",
		"Gifts & Donation",
		"Bill & Utilities",
		"Food & Baverage",
		"Entertainment",
		"Investment",
		"Shopping",
		"Health&Fitness",
	];

	let dictionary = reportViewModel.costByCategory(
		requestTransactions,
		categories
	);

	let costGroup: number[] = [];
	categories.forEach((val, idx) => {
		costGroup.push(Math.ceil(dictionary[val] / 1000));
	});

	const categoryBarData: ChartData = {
		labels: categories,
		datasets: [
			{
				data: costGroup,
			},
		],
	};

	// Daily Cost section
	const dailyCost: number[] = reportViewModel.getDailyCost(requestTransactions);
	// console.log(`Spending on ${dailyCost.length} days`);

	const dailyCostData: LineChartData = {
		labels: [],
		datasets: [
			{
				data: dailyCost,
			},
		],
	};

	return (
		<View style={[reportStyles.center]}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={reportStyles.section}>
					<Text style={reportStyles.tittle}>Overview</Text>
					<BarChart
						fromZero={true}
						yAxisSuffix="k"
						data={overviewBarData}
						width={width}
						height={height * 0.5}
						yAxisLabel=""
						chartConfig={{
							backgroundGradientFrom: "#290066",
							backgroundGradientFromOpacity: 1,
							backgroundGradientTo: "#320675",
							backgroundGradientToOpacity: 0.5,
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							strokeWidth: 3, // optional, default 3
							barPercentage: 1,
							useShadowColorFromDataset: false, // optional
							fillShadowGradientOpacity: 0.3,
						}}
						verticalLabelRotation={0}
						horizontalLabelRotation={0}
						showBarTops={true}
						showValuesOnTopOfBars={true}
					/>
				</View>

				<View style={reportStyles.section}>
					<Text style={reportStyles.tittle}>Cost on Categories</Text>
					<BarChart
						fromZero={true}
						yAxisSuffix="k"
						data={categoryBarData}
						width={width}
						height={height * 0.5}
						yAxisLabel=""
						chartConfig={{
							backgroundGradientFrom: "#9E5800",
							backgroundGradientFromOpacity: 1,
							backgroundGradientTo: "#FFA433",
							backgroundGradientToOpacity: 0.5,
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							strokeWidth: 3, // optional, default 3
							barPercentage: 0.7,
							useShadowColorFromDataset: false, // optional
							fillShadowGradientOpacity: 0.5,
						}}
						verticalLabelRotation={30}
						horizontalLabelRotation={0}
						showBarTops={true}
						showValuesOnTopOfBars={true}
					/>
				</View>

				<View style={reportStyles.section}>
					<Text style={reportStyles.tittle}>Daily Cost</Text>
					<LineChart
						data={dailyCostData}
						width={width}
						height={height * 0.5}
						yAxisSuffix="k"
						verticalLabelRotation={0}
						chartConfig={{
							backgroundGradientFrom: "#1E2923",
							backgroundGradientFromOpacity: 1,
							backgroundGradientTo: "#08130D",
							backgroundGradientToOpacity: 0.5,
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							strokeWidth: 1, // optional, default 3
							// barPercentage: 0.7,
							useShadowColorFromDataset: false, // optional
							fillShadowGradientOpacity: 0.2,
						}}
						bezier
						withVerticalLabels={false}
						style={{ justifyContent: "center", alignItems: "center" }}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const ReportViewHeaderBar = ({ tittle, periods, setPeriod }: any) => {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const pickerItems = (periods: Date[], month: string[]) => {
		let items: any[] = [];
		periods.forEach((val, idx) => {
			items.push(
				<Picker.Item
					label={`${month[val.getMonth()]} ${val.getFullYear()}`}
					value={idx}
				/>
			);
		});

		return React.Children.toArray(items);
	};

	const [dropdownValue, setDropdownValue] = useState(0);

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<View style={reportStyles.center}>
				<Text
					style={{ fontSize: 20, fontWeight: "800", alignSelf: "flex-start" }}
				>
					{tittle}
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Picker
					selectedValue={dropdownValue}
					onValueChange={(item, index) => {
						setDropdownValue(index);
						// console.log(`item picked: ${JSON.stringify(item, null, 4)}`);
						setPeriod(periods[index]);
					}}
				>
					{/* <Picker.Item label="Nov 2020" value={0} />
					<Picker.Item label="Dec 2020" value={1} />
					<Picker.Item label="Jan 2021" value={2} /> */}
					{pickerItems(periods, monthNames)}
				</Picker>
			</View>
		</View>
	);
};

export function ReportView({ navigation }: any) {
	const periods: Date[] = reportViewModel.getPeriodList();
	periods.sort(
		(a, b) => a.getFullYear() + a.getMonth() - (b.getFullYear() + b.getMonth())
	);

	const [period, setPeriod] = useState(periods[0]);

	return (
		<ReportStack.Navigator>
			<ReportStack.Screen
				name="Charts"
				options={{
					headerTitle: (prop) => (
						<ReportViewHeaderBar
							tittle="Report"
							periods={periods}
							setPeriod={setPeriod}
						/>
					),
				}}
				component={() => <ChartsView period={period} />}
			/>
		</ReportStack.Navigator>
	);
}

const reportStyles = StyleSheet.create({
	center: {
		// justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	tittle: {
		fontSize: 20,
		fontWeight: "bold",
		paddingHorizontal: 10,
	},
	section: {
		marginBottom: 15,
	},
});
