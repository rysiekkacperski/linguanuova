import getLLM from "../models/model";
import getImageUrl from "../helpers/getImage";
import FlashCard from "./interfaces/flashCard";
import Phrase from "./interfaces/phrase";

import { HumanMessage, SystemMessage } from "langchain";
import { z } from "zod";

const FlashCardSchema = z.object({
    content_motherTongue: z.string().describe("Content of the phrase in the mother tongue"),
    content_targetLanguage: z.string().describe("Content of the phrase in the target language"),
    content_english: z.string().describe("Content of the phrase in English."),
    exampleSentence_motherTongue: z.string().describe("Example sentence with the phrase in mothertongue."),
    exampleSentence_targetLanguage: z.string().describe("Example sentence with the phrase in target language."),
    tags: z.array(z.string().describe("A tag")).describe("List of tags connected with the flash card.")
});

const FlashCardsSchema = z.array(FlashCardSchema);

type FlashCardOutput = z.infer<typeof FlashCardSchema>

export async function generateFlashCards(
    phrases: Phrase[]
): Promise<FlashCard[] | null>{
    
    let model = getLLM();

    if (!model) {
        console.log("No model available");
        return null;
    }

    model = model.withStructuredOutput(FlashCardsSchema)

    const systemMessage = new SystemMessage(`You are a helpful assistant that generates a list of ${phrases.length} flash cards/flash card in 
        JSON format for language learning. Each phrase should include its content in both the mother 
        tongue and the target language`);

    const humanMessage = new HumanMessage(`Generate the flash cards for the following phrases: ${JSON.stringify(phrases)}.
        Each flash card should include phrase's content for mothertoingue, target language and english, an example sentence in both the mother tongue and the 
        target language and a list of tags (if any). When creating the example sentences, make sure to use the phrase in a natural 
        context and that the context should be the same for both sentences. The tags should be relevant to the content of the flash card.`);

    try {
        const response = await model!.invoke([systemMessage, humanMessage]);
        
        const flashcards: FlashCard[] = response.map(async (flashcard: FlashCardOutput) => {

            let flashcardImage = await getImageUrl(flashcard.content_english);

            return {
                id_motherTongue: phrases[0].id_motherTongue,
                id_targetLanguage: phrases[0].id_targetLanguage,
                content_motherTongue: flashcard.content_motherTongue,
                content_targetLanguage: flashcard.content_targetLanguage,
                content_english: flashcard.content_english,
                exampleSentence_motherTongue: flashcard.exampleSentence_motherTongue,
                exampleSentence_targetLanguage: flashcard.exampleSentence_targetLanguage,
                imageUrl: flashcardImage,
                tags: flashcard.tags,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return flashcards

    } catch (error) {
        console.error("Error generating phrases:", error);
        return null;
    } 

}