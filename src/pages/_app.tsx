import "../styles/tailwind.css";
import "../styles/globals.css";
import "../styles/tailwind-utils.css";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return <Component {...pageProps} />;
};

export default App;
