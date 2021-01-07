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
	date: string = "2000-01-01";

	note?: string;
	emotion?: Emotion;
}

export { Transaction };
