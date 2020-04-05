import {App} from "./App";

const app = new App();

try {
	app.init();
} catch (error) {
	console.log("Error occurred", error);
}