import { groq } from "./groqRequest";

const groqInterface = new groq();

async function main() {
	const response = await groqInterface.sendMessage("user", "Hi");

	console.log("Chat: ", response);
}

main();