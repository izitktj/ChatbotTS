import { readLine } from "./Utils/input";
import { styleText } from "./Utils/styleText";
import { Chat } from "./groqChat";

const chat: Chat = new Chat(Chat.LLMS["GEMMA2"]);

var running = true;

async function main() {
	while(running) {
		styleText.printStyledText("\n**You:** ");
		const response = await chat.SendMessage(await readLine());

		styleText.printStyledText("\n**Chat:** " + response);
	}
}

main();