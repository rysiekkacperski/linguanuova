import { createIndexes, Store } from "tinybase";

const createCustomIndexes = (store: Store) => {
  let indexes = createIndexes(store);
  indexes.setIndexDefinition('byHobby', 'hobby', 'key')
  return indexes;
}

export default createCustomIndexes;