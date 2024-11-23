import { groq } from "./groqRequest";
import { readLine } from "./input";
import { styleText } from "./styleText";

const groqInterface = new groq(groq.LLMS["GEMMA2"]);

var running = true;

async function main() {
	while(running) {
		styleText.printStyledText("\n**You:** ");
		const response = await groqInterface.sendMessage("user", await readLine());

		styleText.printStyledText("\n**Chat:** " + response);
	}
}

function getChatHistory(): string {
	let chatHistory: string = "";

	groqInterface.chatHistory.forEach(element => {
		chatHistory += "\n{ Role: " + element.role + ", Message: " + element.content + " }";
	});

	return chatHistory;
}

main();