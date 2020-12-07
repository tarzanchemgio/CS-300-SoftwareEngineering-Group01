import { Category } from "./Category";

enum Emotion {
	smile,
	cry,
	pokerFace,
	happy,
}

class Transaction {
	category: Category = new Category();
	cost: number = 0;
	date: Date = new Date("2000-00-00");

	note?: string;
	emotion?: Emotion;
}

export { Transaction };
