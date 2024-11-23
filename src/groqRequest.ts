export class groq {
    public static LLMS: Record<string, string> = {
        LLAMA: "llama3-8b-8192",
        GEMMA: "gemma-7b-it",
        GEMMA2: "gemma2-9b-it",
        MIXTRAL: "mixtral-8x7b-32768",
    };

    public chatHistory: { role: string; content: string }[] = [];
    public chatModel: string = "";

    private header: HeadersInit;
    private apiKey: string = "";

    public constructor(model: string) {
        this.apiKey = process.env.GROQ_API_KEY as string;
        this.chatModel = model;

        if (!this.apiKey) {
            throw new Error("API key is missing! Please go to \"https://console.groq.com/keys\" and set GROQ_API_KEY in environment variables.");
        }

        if (!this.chatModel || this.chatModel == null) {
            throw new Error("No LLM model informed!");
        }

        this.header = {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
        };
    }


    public async sendMessage(user: string, message: string) : Promise<string> {
        this.addChatHistory(user, message);

        let response: string = await this.getSimplifiedResponse() as string;

        this.addChatHistory("assistant", response);

        return response;
    }

    public addChatHistory(user: string, message: string) {
        this.chatHistory.push(
            { role: user, content: message }
        );
    }

    public async getSimplifiedResponse () : Promise<string>{
        const response = await this.postRequestGroq(
            this.header, 
            {
                messages: this.chatHistory,
                model: this.chatModel
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