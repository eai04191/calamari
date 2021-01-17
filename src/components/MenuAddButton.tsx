import { useContext } from "react";
import { nanoid } from "nanoid";
import { Store } from "../components/Store";
import { StoreProvider } from "../interfaces";
import { Plus } from "./Icons";
import clsx from "clsx";

export const MenuAddButton = (): JSX.Element => {
    const { dispatch }: StoreProvider = useContext(Store)!;

    return (
        <div className="flex select-none">
            <button
                className={clsx(
                    "inline-flex items-center justify-center m-4 p-2 w-full font-semibold border-2 rounded-md hover:opacity-100 focus:opacity-100 opacity-60 cursor-pointer",
                    "text-gray-800 border-gray-600"
                )}
                onClick={() => {
                    const title = prompt("What is the name of your new note?");
                    if (title) {
                        const id = nanoid();
                        dispatch({
                            type: "ADD_NOTE",
                            payload: { id: id, title: title },
                        });
                    }
                }}
            >
                <Plus className="inline w-6 h-6 text-gray-600" />
                Add a Note
            </button>
        </div>
    );
};
