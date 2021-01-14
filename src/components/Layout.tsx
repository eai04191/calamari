import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
    children: ReactNode;
    title: string;
};

export const Layout = ({ children, title }: Props): JSX.Element => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <header>
            <p>Header</p>
        </header>
        {children}
        <footer>
            <p>Footer</p>
        </footer>
    </div>
);
