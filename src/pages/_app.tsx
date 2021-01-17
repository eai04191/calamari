import "../styles/tailwind.css";
import "../styles/globals.css";
import "../styles/tailwind-utils.css";
import { AppProps } from "next/app";
import { StoreProvider } from "../components/Store";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    );
};

export default App;
