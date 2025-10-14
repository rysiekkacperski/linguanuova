import { ChatOpenAI } from "@langchain/openai";

function getLLM() {
  if (!process.env.OPENAI_API_KEY) {
    return null
  }

  const llm = new ChatOpenAI({
    model: "gpt-5-mini",
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  return llm

}

export default getLLM;