import getLLM from "../models/model";
import Phrase from "../../../interfaces/phrase";

import { HumanMessage, SystemMessage } from "langchain";
import { z } from "zod";
import { LanguageIso } from "../../../interfaces/language";

const PhraseSchema = z.object({
  content_motherTongue: z.string().describe("Content of the phrase in the mother tongue"),
  content_targetLanguage: z.string().describe("Content of the phrase in the target language"),
});

type PhraseOutput = z.infer<typeof PhraseSchema>

const PhrasesSchema = z.array(PhraseSchema);

export async function generatePhrases(
  iso_motherTongue: LanguageIso, 
  iso_targetLanguage: LanguageIso, 
  userHobbies: string[], 
  numberOfPhrases: number
): Promise<Phrase[] | null> {
  let model = getLLM();

  if (!model) {
    console.log("No model available");
    return null;
  }

  model = model.withStructuredOutput(PhrasesSchema)

  const userHobbiesString = userHobbies.length > 0 ? `The phrases should be related to the following hobbies: ${userHobbies.join(", ")}.` : "";

  const systemMessage = new SystemMessage(`You are a helpful assistant that generates a list of ${numberOfPhrases} phrases/phrase in JSON format for language learning. 
    Each phrase should include its content in both the mother tongue and the target language. Each phrase should be one word or a couple of words 
    with a meaning in target language. Ensure the phrases are common and useful for everyday conversations.`);

  const humanMessage = new HumanMessage(`Generate the phrases in: ${iso_motherTongue} and 
    translate them to: ${iso_targetLanguage}. ${userHobbiesString}.`);

  try {
    const response = await model!.invoke([systemMessage, humanMessage]);
    
    const phrases: Phrase[] = response.map((phrase: PhraseOutput): Phrase => ({
      iso_motherTongue: iso_motherTongue,
      iso_targetLanguage: iso_targetLanguage,
      content_motherTongue: phrase.content_motherTongue,
      content_targetLanguage: phrase.content_targetLanguage
    }));

    return phrases

  } catch (error) {
    console.error("Error generating phrases:", error);
    return null;
  } 

}