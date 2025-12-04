import { Language, LanguageIso, LanguageIsoSchema } from "@/interfaces/language";
import { useStore } from "tinybase/ui-react";

export function excludeLanguageByIso(
  languages: Language[], 
  languageIso: LanguageIso
){
  return languages.filter((lang) => lang['iso'] != languageIso);
}

export function getDefaultLanguage(){
  const defaultLanguageParsed = LanguageIsoSchema.safeParse(
    useStore()?.getValue('defaultLanguage')
  );
  return defaultLanguageParsed.success ? defaultLanguageParsed.data : null;
}