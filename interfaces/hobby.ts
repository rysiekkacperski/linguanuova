import { LanguageIso } from "./language"

export default interface Hobby{
    id?: string
    name: string
    labels: Record<LanguageIso, string>
    iconName: string
    createdAt: Date
    updatedAt?: Date    
}