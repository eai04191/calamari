import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Store } from "../components/Store";
import { State, StoreProvider } from "../interfaces";
import { MenuItem } from "./MenuItem";
import { MenuAddButton } from "./MenuAddButton";
import Link from "next/link";

export const Menu = (): JSX.Element => {
    const { state }: StoreProvider = useContext(Store)!;
    const router = useRouter();

    // stateを監視して追加されたらそれをrouterにpushする

    // 前回のstateをrefで保存するhook
    // https://ja.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    function usePrevious(state: State) {
        const ref = useRef<State>();
        useEffect(() => {
            ref.current = state;
        });
        return ref.current;
    }

    const prevState = usePrevious(state);

    useEffect(() => {
        if (prevState && state.notes.length > prevState?.notes.length) {
            // 新しいnoteがあればそのidに遷移する
            router.push(`/${state.notes.slice(-1)[0].id}`);
        }
    }, [state]);

    return (
        <nav
            className="fixed flex-shrink-0 w-72 min-h-full shadow overflow-y-auto"
            aria-label="List of notes."
        >
            <Link href="./">
                <div
                    className="p-4 text-white text-2xl font-semibold tracking-wider bg-gradient-to-r shadow-sm from-red-600 to-yellow-500 cursor-pointer select-none"
                    tabIndex={0}
                >
                    Calamari
                </div>
            </Link>
            {/* parentを持っていないnoteだけを表示する */}
            {state.notes
                .filter((note) => !note.parent)
                .map((note) => (
                    <MenuItem key={note.id} note={note} level={1} />
                ))}
            <MenuAddButton />
        </nav>
    );
};
