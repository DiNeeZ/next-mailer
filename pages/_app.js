import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "@/components/AppContainer";
import theme from "@/config/theme";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}
