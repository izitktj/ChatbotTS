import { groq } from "./groqRequest";
import { readLine } from "./input";
import { styleText } from "./styleText";

const groqInterface = new groq();

var running = true;

async function main() {
	while(running) {
		styleText.printStyledText("\n**You:** ");
		const response = await groqInterface.sendMessage("user", await readLine());

		styleText.printStyledText("\n**Chat:** " + response);
	}
}

main();