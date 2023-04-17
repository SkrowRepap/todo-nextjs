import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { extendTheme } from "@chakra-ui/react";
import { checkboxTheme } from "@/components/Theme/CheckboxTheme";
import { ToggleShowTodoProvider } from "@/context/ToggleShowTodo";

export const theme = extendTheme({
  components: { Checkbox: checkboxTheme },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider theme={theme}>
      <ToggleShowTodoProvider>
        {getLayout(<Component {...pageProps} />)}
      </ToggleShowTodoProvider>
    </ChakraProvider>
  );
}
