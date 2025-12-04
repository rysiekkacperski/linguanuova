import l from '@/src/assets/data/languages.json';
import { z } from "zod";
import { HEX } from "./utils";

export const isoLanguageLiterals: Record<string, string> = l.languages
  .reduce((acc, val) => ({...acc, [val.iso]: val.iso}), {});

export const LanguageIsoSchema = z.nativeEnum(isoLanguageLiterals);

export type LanguageIso = z.infer<typeof LanguageIsoSchema>

export interface Language {
  id?: string
  iso: LanguageIso
  label?: string
  flagUrl?: string
  flagColors?: HEX[] 
}

export interface LanguagePair {
  leadingLanguageIso: LanguageIso
  taughtLanguageIso: LanguageIso
}