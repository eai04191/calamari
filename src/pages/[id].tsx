import { useContext } from "react";
import { useRouter } from "next/router";
import { StoreProvider } from "../interfaces";
import { Layout } from "../components/Layout";
import { Store } from "../components/Store";
import { Viewer } from "../components/Viewer";
import { EmojiSad } from "../components/Icons";

const itemDetails = (): JSX.Element => {
    const { state }: StoreProvider = useContext(Store)!;
    const router = useRouter();
    const id = router.query.id;

    // [id].tsxなのでここには行かないはず
    if (!id) {
        return (
            <Layout title="Error | Calamari">
                <p>
                    <span style={{ color: "red" }}>Error:</span> Item id is
                    missing.
                </p>
            </Layout>
        );
    }

    const note = state.notes.find((note) => note.id === id);

    if (!note) {
        return (
            <Layout title="Error | Calamari">
                <div className="flex flex-grow p-4">
                    <div className="flex flex-col flex-grow pb-8 pt-4 px-6 bg-white rounded-lg shadow-md">
                        <h1 className="mr-auto p-2 pb-4 break-all text-3xl font-bold border border-transparent rounded-md">
                            Error
                        </h1>
                        <div className="flex items-center justify-center ml-2 w-full h-60 border-4 border-dashed border-gray-300 rounded-md">
                            <div className="flex flex-col items-center justify-center text-center text-gray-800">
                                <EmojiSad
                                    className="pb-2 h-16 text-gray-600"
                                    strokeWidth={1.4}
                                />
                                Sorry, No note found you specified.
                            </div>
                        </div>
                        <p></p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`${note.title} | Calamari`}>
            <Viewer note={note} />
        </Layout>
    );
};

export default itemDetails;
