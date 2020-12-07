import { Quiz } from "./Quiz";

class Lesson {
	topic: string = "";
	quizs: Quiz[] = [];
	score: number = 0;

	icon?: string;
}

export { Lesson };
