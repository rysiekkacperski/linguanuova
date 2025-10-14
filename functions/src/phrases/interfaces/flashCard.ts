import Phrase from "./phrase"

export default interface FlashCard extends Phrase{
    content_english: string
    exampleSentence_motherTongue: string
    exampleSentence_targetLanguage: string
    imageUrl?: string
    tags?: string[]
    createdAt: Date
    updatedAt: Date
}

