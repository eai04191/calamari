import { createContext, useReducer } from "react";
import { Actions, State } from "../interfaces";
import { reducer } from "../utils/reducer";

const initialState: State = {
    notes: [
        {
            id: "L0zupPmBQSH8Iqo7hB3Ig",
            title: "Calamari",
            content:
                "**Calamari** is _squid_ as food.\n![random image of calamari](https://source.unsplash.com/featured/?calamari)\n\nI've never had it, but it looks delicious.😋",
            children: ["wA6tk3VeMNuFrNTu8gka_"],
        },
        {
            id: "wA6tk3VeMNuFrNTu8gka_",
            parent: "L0zupPmBQSH8Iqo7hB3Ig",
            title: "Squid",
            content:
                "![random image of squid](https://source.unsplash.com/featured/?squid)",
            children: ["ubIJBY8MJF36-8QlqQ_7I", "jj80SgJ2LRHruXXdAI1yP"],
        },
        {
            id: "ubIJBY8MJF36-8QlqQ_7I",
            parent: "wA6tk3VeMNuFrNTu8gka_",
            title: "Level 3 Note",
            content:
                "## TODO\n\n- [x] auto route when note created\n- [x] 404\n- [ ] dark mode",
        },
        {
            id: "jj80SgJ2LRHruXXdAI1yP",
            parent: "wA6tk3VeMNuFrNTu8gka_",
            title: "Level 3 Note (2)",
            content: "",
        },
    ],
};

type contextType = {
    state: State;
    dispatch: React.Dispatch<Actions>;
};

// TODO: undefinedをなんとかしたい
export const Store = createContext<contextType | undefined>(undefined);
export const StoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
};
