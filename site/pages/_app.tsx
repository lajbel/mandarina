import "./globals.css";
import { AppProps } from "next/app";
import Page from "components/Page";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    );
}
