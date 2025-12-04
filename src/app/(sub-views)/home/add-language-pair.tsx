import { LanguageIso } from "@/interfaces/language";
import AddLanguagePairScreen from "@/src/screens/AddLanguagePairScreen";
import { getDefaultLanguage } from "@/src/utils/language";
import { useState } from "react";

export default function AddLanguagePairView(){
  const [primaryLang, setPrimaryLang] = useState<LanguageIso | null>(
    getDefaultLanguage()
  );
  const [taughtLang, setTaughtLang] = useState<LanguageIso | null>(null);
  

  return(
    <AddLanguagePairScreen
      primaryLang={primaryLang}
      setPrimaryLang={setPrimaryLang}
      taughtLang={taughtLang}
      setTaughtLang={setTaughtLang}
    />
  );
}