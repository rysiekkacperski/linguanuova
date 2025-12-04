import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      languageNames:{
        pl: "Polish",
        en: "English",
        it: "Italian",
        fr: "French"
      },
      views:{
        noLanguagePair:{
          header: "You don't have any language pair :(",
          description: "To enjoy LinguaNuova pick your first language pair",
          primaryButtonText: "Let's start",
        },
        addLanguagePair:{
          header:"Are you ready for new journey?",
          description: "Pick primary and taught languages to start your learning process",
          primaryButtonText: "Add new pair",
          info: "Remember that you should be an advanced user of the primary language to learn effectively",
          primaryLang: "Primary language:",
          taughtLang: "Taught language:"
        }
      }
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;