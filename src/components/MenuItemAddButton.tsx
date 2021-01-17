import { useContext } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { Store } from "../components/Store";
import { Note, StoreProvider } from "../interfaces";
import { PlusSmall } from "./Icons";

interface Props {
    note: Note;
    isActive?: boolean;
}

export const MenuItemAddButton = ({ note, isActive }: Props): JSX.Element => {
    const { dispatch }: StoreProvider = useContext(Store)!;
    return (
        <button
            aria-label="Create a child note of this note."
            type="button"
            className={clsx(
                "inline-flex items-center justify-center w-6 h-6 border-2 rounded hover:opacity-100 focus:opacity-100",
                isActive
                    ? "text-gray-50 border-gray-50 opacity-60"
                    : "text-gray-600 border-gray-600 opacity-40"
            )}
            onClick={(e) => {
                const title = prompt(
                    `What is the name for your new note that will be a child of '${note.title}'?`
                );
                if (title) {
                    const id = nanoid();
                    dispatch({
                        type: "ADD_CHILDREN",
                        payload: {
                            id: id,
                            title: title,
                            parent: note.id,
                        },
                    });
                } else {
                    e.preventDefault();
                }
            }}
        >
            <PlusSmall />
        </button>
    );
};
