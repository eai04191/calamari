import { useContext, useEffect, useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Store } from "../components/Store";
import { LightBulb } from "./Icons";
import { Note, StoreProvider } from "../interfaces";
import "react-mde/lib/styles/css/react-mde-preview.css";

interface Props {
    note: Note;
    mode: "write" | "preview";
}

export const ViewerContent = ({ note, mode }: Props): JSX.Element => {
    const { dispatch }: StoreProvider = useContext(Store)!;
    const [content, setContent] = useState(note.content);

    // next.jsのdynamic routingは既存のstateを維持するので、ページ（note）が変わったときに明示的にstateに入れ直す
    useEffect(() => {
        setContent(note.content);
    }, [note]);

    useEffect(() => {
        dispatch({
            type: "UPDATE_NOTE_CONTENT",
            payload: { id: note.id, content: content },
        });
    }, [mode]);

    return (
        <div className="relative flex-grow overflow-auto" tabIndex={0}>
            {content.length === 0 && mode === "preview" ? (
                <div className="flex items-center justify-center ml-2 h-60 border-4 border-dashed border-gray-300 rounded-md">
                    <div className="flex flex-col items-center justify-center text-center text-gray-800">
                        <LightBulb
                            className="pb-2 h-16 text-gray-600"
                            strokeWidth={1.4}
                        />
                        This note has no content. <br />
                        You can edit from the Edit button.
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0" role="article">
                    <ReactMde
                        value={content}
                        onChange={setContent}
                        selectedTab={mode}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown
                                    source={markdown}
                                    plugins={[gfm]}
                                />
                            )
                        }
                    />
                </div>
            )}
        </div>
    );
};
