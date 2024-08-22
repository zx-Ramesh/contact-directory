"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";


interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
};

export default Providers;
