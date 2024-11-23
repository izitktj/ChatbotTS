import { GroqRequest } from "./groqRequest";

export class ChatHistory {
    public role: string = "";
    public content: string = "";
}

export class Chat {
    public static LLMS: Record<string, string> = {
        LLAMA: "llama3-8b-8192",
        GEMMA: "gemma-7b-it",
        GEMMA2: "gemma2-9b-it",
        MIXTRAL: "mixtral-8x7b-32768",
    };

    public chatHistory: ChatHistory[] = [];
    public chatModel: string = "";

    private groqRequests: GroqRequest = new GroqRequest();

    public constructor(model: string) {
        if(model == "" || !model) {
            throw new Error("No LLM model provided!");
        }

        this.chatModel = model
    }

    public async SendMessage(message: string): Promise<string> {
        this.addChatHistory("user", message);

        let response: string = await this.groqRequests.getSimplifiedResponse(this.chatHistory, this.chatModel) as string;

        this.addChatHistory("assistant", response);

        return response;
    }
    
    public addChatHistory(user: string, message: string) {
        this.chatHistory.push(
            { role: user, content: message }
        );
    }

    public clearChatHistory() {
        this.chatHistory = [];
    }

    public getChatHistory(): string {
        let chatHistory: string = "";

        this.chatHistory.forEach(element => {
            chatHistory += "\n{ Role: " + element.role + ", Message: " + element.content + " }";
        });

        return chatHistory;
    }
}