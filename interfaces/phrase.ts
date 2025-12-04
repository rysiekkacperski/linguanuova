import { LanguageIso } from "./language"

export default interface Phrase{
    id?: string
    iso_motherTongue: LanguageIso
    iso_targetLanguage: LanguageIso
    content_motherTongue: string
    content_targetLanguage: string
}