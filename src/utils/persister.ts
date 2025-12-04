import * as SQLite from "expo-sqlite";
import { Store } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { useCreatePersister } from "tinybase/ui-react";

export const useAndStartPersister = (store: Store) =>
  // Persist store to Expo SQLite 
  useCreatePersister(
    store,
    (store) => createExpoSqlitePersister(store, SQLite.openDatabaseSync("todos.db")),
    [],
    (persister) => persister.load().then(persister.startAutoSave)
  );