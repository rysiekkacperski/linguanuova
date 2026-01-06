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
      common: {
        save: 'Save changes',
        continue: 'Save & continue',
        search: 'Search...',
        skip: 'Skip for now',
        cancel: 'Cancel',
        textTooLong: "Text is too long",
        noResults: "No results found",
        back: 'Back',
        next: 'Next',
      },
      views:{
        noLanguagePair:{
          header: "You don't have any language pair :(",
          description: "To enjoy LinguaNuova pick your first language pair",
          primaryButtonText: "Let's start",
        },
        addLanguagePair:{
          goal_title: "Pick your goal",
          goal_subtitle: "Your goal will let us generate flash cards tailored to your needs",
          taught_title: "What do you want to learn?",
          taught_subtitle: "Pick language you want to improve",
          leading_title: "Choose a basic language",
          leading_subtitle: "Pick the language you know well. All phrases will be translated to it",   
        },
        userDescription: {
          editTitle: "Edit description",
          editSubtitle: 'Descrive yourself better to let AI create more practical examples',
          title: "Let's get to know you!",
          subtitle: "Describe who you are (profession, hobbies) and why you want to learn the language. This helps AI create practical examples",
          placeholder: "E.g. I work as a graphic designer, learning Japanese because I love manga and plan a trip to Tokyo...",
        },
        userHobbies: {
          hobbies: {
            "travel": "Travel",
            "technology": "Technology",
            "cooking": "Cooking",
            "sport": "Sport",
            "music": "Music",
            "movies": "Movies",
            "gaming": "Gaming", 
            "reading": "Reading",
            "gym": "Gym",
            "photography": "Photography",
            "business": "Business",
            "languages": "Languages",
            "art": "Art",
            "cars": "Cars",
          },
          title: "What are you interested in?",
          edit_title: "Edit your hobbies",
          subtitle: "Pick your hobbies to help AI create better flashcards"
        },
        userGoals: {
          title: "What are your main goal?",
          subtitle: "Pick main goal which you have while learning the language"
        },
        goals:{
          tourism: {
            name: 'Tourism',
            description: 'I want to use the language while travelling'
          },
          casual: {
            name: 'Casual',
            description: 'I want to talk with others and make new friends'
          },
          business: {
            name: 'Business',
            description: 'I need to communicate in a professional way'
          },
          academic: {
            name: 'Academic',
            description: 'I want to study in the choosen language'
          },
          culture: {
            name: 'Culture',
            desription: 'I want to read books, watch films and understand art'
          }
        },
        welcomeUser:{
          header: "Are you ready for new journey?",
          description: "We need to gather some basic info about you to improve you experience. Trust us, it won't take even two minutes!",
          primaryButtonText: "Let's start!"
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