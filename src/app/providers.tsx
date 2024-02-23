"use client";

import { Provider, lightTheme } from "@adobe/react-spectrum";

interface ReactSpectrumProviderProps {
  children: React.ReactNode;
}

export const ReactSpectrumProvider = ({
  children,
}: ReactSpectrumProviderProps) => {
  return <Provider theme={lightTheme}>{children}</Provider>;
};
