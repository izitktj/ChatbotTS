import { ChatHistory } from "./groqChat";

export class GroqRequest {
    private header: HeadersInit;
    private apiKey: string = "";

    public constructor() {
        this.apiKey = process.env.GROQ_API_KEY as string;

        if (!this.apiKey) {
            throw new Error("API key is missing! Please go to \"https://console.groq.com/keys\" and set GROQ_API_KEY in environment variables.");
        }

        this.header = {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
        };
    }

    public async getSimplifiedResponse (chatHistory: ChatHistory[], chatModel: string) : Promise<string>{
        const response = await this.postRequestGroq(
            this.header, 
            {
                messages: chatHistory,
                model: chatModel
            }
        );

        return response.choices[0].message.content;
    }


    private postRequestGroq = async (headers: HeadersInit, body: object) => {
    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            
            {
            method: "POST",
            headers,
            body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP request error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error! ${error}`);
    }
    };
}