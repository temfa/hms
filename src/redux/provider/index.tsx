"use client";

import { PersistGate } from "redux-persist/integration/react";
import store from "../store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import Loading from "@/app/loading";
import BodyLayout from "@/utils/body-layout";

export function Providers({ children }: { children: React.ReactNode }) {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BodyLayout>{children}</BodyLayout>
      </PersistGate>
    </Provider>
  );
}
