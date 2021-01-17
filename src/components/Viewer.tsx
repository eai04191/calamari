import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Note } from "../interfaces/";
import { ViewerTitle } from "../components/ViewerTitle";
import { ViewerContent } from "../components/ViewerContent";

interface Props {
    note: Note;
}

export const Viewer = ({ note }: Props): JSX.Element => {
    const [mode, setMode] = useState<"write" | "preview">("preview");
    const router = useRouter();

    // ページが切り替わったときにプレビューモードに戻す
    useEffect(() => {
        setMode("preview");
    }, [router.asPath]);

    return (
        <div className="flex flex-grow p-4">
            <div className="flex flex-col flex-grow pb-8 pt-4 px-6 bg-white rounded-lg shadow-md">
                <ViewerTitle note={note} mode={mode} setMode={setMode} />
                <ViewerContent note={note} mode={mode} />
            </div>
        </div>
    );
};
