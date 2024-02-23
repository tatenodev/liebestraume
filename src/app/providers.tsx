"use client";

import { Provider, SSRProvider, lightTheme } from "@adobe/react-spectrum";

interface ReactSpectrumProviderProps {
  children: React.ReactNode;
}

export const ReactSpectrumProvider = ({
  children,
}: ReactSpectrumProviderProps) => {
  return (
    <SSRProvider>
      <Provider theme={lightTheme}>{children}</Provider>
    </SSRProvider>
  );
};
