import React, { ReactNode } from "react";
import Head from "next/head";
import { Menu } from "./Menu";
import { Footer } from "./Footer";

type Props = {
    children: ReactNode;
    title: string;
};

export const Layout = ({ children, title }: Props): JSX.Element => (
    <div className="flex h-screen min-h-screen transition-all">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <Menu />
        <div className="flex flex-col pl-72 w-full h-full">
            {children}
            <Footer />
        </div>
    </div>
);
