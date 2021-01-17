export interface State {
    notes: Note[];
}

export interface Note {
    id: string;
    parent?: string;
    title: string;
    content: string;
    children?: string[];
}

export type Actions =
    | AddNoteAction
    | AddChildrenAction
    | UpdateNoteTitleAction
    | UpdateNoteContentAction;

interface AddNoteAction {
    type: "ADD_NOTE";
    payload: { id: string; title: string };
}

interface AddChildrenAction {
    type: "ADD_CHILDREN";
    payload: { id: string; title: string; parent: string };
}

interface UpdateNoteTitleAction {
    type: "UPDATE_NOTE_TITLE";
    payload: { id: string; title: string };
}

interface UpdateNoteContentAction {
    type: "UPDATE_NOTE_CONTENT";
    payload: { id: string; content: string };
}

export interface StoreProvider {
    state: State;
    dispatch: React.Dispatch<Actions>;
}
