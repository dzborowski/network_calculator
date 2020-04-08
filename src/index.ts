import {App} from "./App";

const app = new App();

try {
	app.run();
} catch (error) {
	console.log("Error occurred", error);
}