import { groq } from "./groqRequest";
import { readLine } from "./input";
import { styleText } from "./styleText";

const groqInterface = new groq();

const running = true;

function textToken() {
	const stringOriginal: string = "Olá, **Texto marcado** __Sublinhado__ certo?";

	const tokens = styleText.convertTokenToClass(stringOriginal);

	console.log(stringOriginal);

	console.log(tokens);

	tokens.forEach(Element => {
		process.stdout.write(Element.style + Element.text);
	});
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