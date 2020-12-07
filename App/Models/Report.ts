import { MoneyFlow } from "./MoneyFlow";
import { Transaction } from "./Transaction";

class Report {
	flow: MoneyFlow = new MoneyFlow();
	moth: Date = new Date(); // Tính theo tháng và năm
	transactions: Transaction[] = [];
}

export { Report };
