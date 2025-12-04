import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { createStore } from "tinybase";
import { Provider as StoreProvider, useCreateStore } from "tinybase/ui-react";
import '../utils/i18n';
import { useAndStartPersister } from "../utils/persister";

export default function RootLayout() {
  const store = useCreateStore(createStore).setValuesSchema({
    defaultLanguage: {type: "string"}
  });
  useAndStartPersister(store)

  return(
    <StoreProvider
      store={store}
    >
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </StoreProvider>
  )
  
}
