import { createRef, useContext } from "react";
import clsx from "clsx";
import { Note, StoreProvider } from "../interfaces";
import { Store } from "../components/Store";
import { CheckSmall, PencilSmall } from "./Icons";

interface Props {
    note: Note;
    mode: "write" | "preview";
    setMode: React.Dispatch<React.SetStateAction<"write" | "preview">>;
}

export const ViewerTitle = ({ note, mode, setMode }: Props): JSX.Element => {
    const { dispatch }: StoreProvider = useContext(Store)!;
    const titleRef = createRef<HTMLHeadingElement>();

    return (
        <div className="flex items-end pb-4">
            <h1
                className={clsx(
                    "mr-auto p-2 break-all text-3xl font-bold border border-transparent rounded-md",
                    mode === "write" && " border-gray-300 shadow-sm"
                )}
                contentEditable={mode === "write"}
                suppressContentEditableWarning={true}
                ref={titleRef}
            >
                {note.title}
            </h1>
            {mode === "write" ? (
                <>
                    <button
                        className="flex items-center justify-center ml-2 p-2 h-12 border border-gray-300 hover:border-gray-500 rounded"
                        onClick={() => {
                            setMode("preview");
                            dispatch({
                                type: "UPDATE_NOTE_TITLE",
                                payload: {
                                    id: note.id,
                                    title:
                                        titleRef.current?.innerText ||
                                        note.title,
                                },
                            });
                        }}
                    >
                        <CheckSmall className="inline mr-1 w-5" />
                        Save
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="flex items-center justify-center ml-2 p-2 h-12 border border-gray-300 hover:border-gray-500 rounded"
                        onClick={() => {
                            setMode("write");
                            console.log(document.querySelector("textarea"));
                        }}
                    >
                        <PencilSmall className="inline mr-1 w-5" />
                        Edit
                    </button>
                </>
            )}
        </div>
    );
};
