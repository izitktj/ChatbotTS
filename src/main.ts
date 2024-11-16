import { groq } from "./groqRequest";
import { readLine } from "./input";

const groqInterface = new groq();

const running = true;

async function main() {
	while(running) {
		process.stdout.write("\nYou: ");
		const response = await groqInterface.sendMessage("user", await readLine());

		console.log("\nChat: ", response);
	}
}

main();