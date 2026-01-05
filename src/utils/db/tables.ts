import type { TablesSchema } from 'tinybase';

export const tables: TablesSchema = {
  languagePairs: {
    leadingLanguageIso: {type: 'string'},
    taughtLanguageIso: {type: 'string'},
    goal: {type: 'string'},
  },
  hobbies: {
    key: {type: 'string'},
  }
};

export default tables;