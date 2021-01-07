import React, { useState } from "react";
import { Transaction } from "../Models/Transaction";

class ReportViewModel {
	/**
	 * Return list of required transactions and their total cost
	 * @param period A specific month of a year
	 */
	getTransactions = (period: Date) => {
		console.log(`curretnDate: ${JSON.stringify(period, null, 4)}`);

		let transactions = require("../Resources/Transactions/Transactions.json") as Transaction[];

		let requestTransactions: Transaction[] = [];
		let cost = 0;
		for (let i = 0; i < transactions.length; i++) {
			let date = new Date(transactions[i].date);
			if (
				date.getFullYear() === period.getFullYear() &&
				date.getMonth() === period.getMonth()
			) {
				requestTransactions.push(transactions[i]);
				cost += transactions[i].cost;
			}
		}

		console.log(
			`${period.toDateString()}: has ${requestTransactions.length} transactions`
		);
		return { requestTransactions, cost };
	};

	/**
	 * Number of months for short
	 */
	getPeriodList = (): Date[] => {
		let transactions: Transaction[] = require("../Resources/Transactions/Transactions.json");

		let periods: Date[] = [];
		for (let i = 0; i < transactions.length; i++) {
			let isFound = periods.find((v, j) => {
				let date = new Date(transactions[i].date);
				if (
					v.getFullYear() === date.getFullYear() &&
					v.getMonth() === date.getMonth()
				) {
					return true;
				}
			});

			if (isFound === undefined) {
				periods.push(new Date(transactions[i].date));
			}
		}

		console.log(`Found: ${periods.length} periods`);
		return periods;
	};

	/**
	 * Return a tuple of total cost and number of transactions
	 */
	getTotalCost = () => {
		// let transactionsJson = require("../Resources/Transactions/Transactions.json");
		// console.log(transactionsJson);

		let transactions: Transaction[] = require("../Resources/Transactions/Transactions.json");

		let total = 0;
		let amount = 0;
		for (let i = 0; i < transactions.length; i++) {
			total += transactions[i].cost;
			amount += 1;
		}

		console.log(`Total: ${total}. Amount: ${amount}`);
		return { total, amount };
	};

	/**
	 * Return an dictionary<string, number>
	 * Category name is the key
	 * Cost of that category is value
	 * @param transactions Transactions
	 * @param categories List of category
	 */
	costByCategory = (transactions: Transaction[], categories: string[]) => {
		let dictionary: any = {
			// categoryName: array of transactions
		};

		for (let i = 0; i < transactions.length; i++) {
			for (let j = 0; j < categories.length; j++) {
				if (transactions[i].category.name === categories[j]) {
					let cost = dictionary[categories[j]]; // Take out array
					if (cost !== null && cost !== undefined) {
						cost += transactions[i].cost;
						dictionary[categories[j]] = cost;
					} else {
						let costGroup = 0;
						dictionary[categories[j]] = costGroup;
						console.log(`Category: ${categories[j]}`);
					}
				}
			}
		}

		return dictionary;
	};

	/**
	 * Return array of cost for each day
	 * @param transactions Transactions
	 */
	getDailyCost = (transactions: Transaction[]) => {
		let dailyCost: number[] = [];

		transactions.sort((a, b) => a.date.localeCompare(b.date));

		let date = new Date(transactions[0].date);
		let tmpDate = date.getDate();
		let tmpCost = 0;
		for (let i = 0; i < transactions.length; i++) {
			date = new Date(transactions[i].date);
			if (tmpDate === date.getDate()) {
				tmpCost += transactions[i].cost;
			} else {
				dailyCost.push(tmpCost);

				tmpCost = 0;
				tmpDate = date.getDate();
			}
		}

		return dailyCost;
	};
}

export { ReportViewModel };
