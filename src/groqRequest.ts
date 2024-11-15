export class groq {
  private chatHistory: { role: string; content: string }[] = [];
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


  public async sendMessage(user: string, message: string) : Promise<string> {
    this.addChatHistory(user, message);

    return await this.getResponse("llama3-8b-8192");
  }

  public addChatHistory(user: string, message: string) {
    this.chatHistory.push(
      { role: user, content: message }
    );
  }

  public async getResponse (chatModel: string) : Promise<string>{
    const response = await this.postRequestGroq(this.header, 
      {
        messages: this.chatHistory,
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