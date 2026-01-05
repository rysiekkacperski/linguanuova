import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { createStore } from "tinybase";
import { Provider as StoreProvider, useCreateStore } from "tinybase/ui-react";
import createCustomIndexes from "../utils/db/indexes";
import useAndStartPersister from "../utils/db/persister";
import createCustomQueries from "../utils/db/queries";
import tables from "../utils/db/tables";
import values from "../utils/db/values";
import '../utils/i18n';

export default function RootLayout() {
  const store = useCreateStore(createStore)
    .setTablesSchema(tables)
    .setValuesSchema(values)
  const indexes = createCustomIndexes(store);
  const queries = createCustomQueries(store);
  useAndStartPersister(store);

  return(
    <StoreProvider
      store={store}
      indexes={indexes}
      queries={queries}
    >
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </StoreProvider>
  )
  
}
