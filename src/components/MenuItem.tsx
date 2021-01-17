import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Store } from "../components/Store";
import { Note, StoreProvider } from "../interfaces";
import { MenuItemAddButton } from "./MenuItemAddButton";

interface Props {
    note: Note;
    level: number;
}

export const MenuItem = ({ note, level }: Props): JSX.Element => {
    const { state }: StoreProvider = useContext(Store)!;

    const router = useRouter();
    const id = router.query.id;
    const isActive = id === note.id;

    return (
        <>
            {/* level 1 = pl-4 */}
            {/* level 2 = pl-8 */}
            {/* level 3 = pl-12 */}
            <Link href={note.id}>
                <div
                    className={clsx(
                        "flex p-4 hover:underline cursor-pointer",
                        isActive &&
                            "bg-gradient-to-r from-red-600 to-yellow-600 text-gray-50",
                        level === 1 && "font-bold",
                        "pl-" + level * 4
                    )}
                    tabIndex={0}
                >
                    <span className="mr-auto pr-2 break-all select-none">
                        {note.title}
                    </span>
                    {/* levelが3未満のときのみ追加ボタンを表示する */}
                    {level < 3 && (
                        <MenuItemAddButton note={note} isActive={isActive} />
                    )}
                </div>
            </Link>

            {note.children &&
                note.children.map((childId) => {
                    const childNote = state.notes.find(
                        (note) => note.id === childId
                    );
                    if (childNote)
                        return (
                            <MenuItem
                                note={childNote}
                                level={level + 1}
                                key={childNote.id}
                            />
                        );
                })}
        </>
    );
};
