import { groq } from "./groqRequest";
import { readLine } from "./input";

const groqInterface = new groq();

const running = true;

function textToken() {
	const styleMod = require("./styleText");
	console.log(styleMod.convertTokenToClass("Olá, **Texto marcado** __Sublinhado__ certo?"));
}

async function main() {
	while(running) {
		process.stdout.write("\nYou: ");
		const response = await groqInterface.sendMessage("user", await readLine());

		console.log("\nChat: ", response);
	}
}

textToken();

// main();