const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

export function readLine(): Promise<string> {
    return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin
    });

    rl.question("", (resposta: string) => {
      rl.close();
      resolve(resposta as string);
    });
  });
}