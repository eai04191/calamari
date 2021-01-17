import { Layout } from "../components/Layout";

const IndexPage = (): JSX.Element => (
    <Layout title="Home">
        <div className="flex h-screen">
            <h1 className="m-auto text-4xl">Hello Next.js 👋</h1>
        </div>
    </Layout>
);

export default IndexPage;
