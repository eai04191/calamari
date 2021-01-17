import { Actions, State } from "../interfaces";

export const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "ADD_NOTE": {
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        content: "",
                    },
                ],
            };
        }
        case "ADD_CHILDREN": {
            const parentNodeIndex = state.notes.findIndex(
                (note) => note.id === action.payload.parent
            );
            // parentのnoteが見つからなかったらなにもしない
            if (parentNodeIndex === -1) return state;

            const parentNote = state.notes[parentNodeIndex];

            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, parentNodeIndex),
                    {
                        ...parentNote,
                        children: [
                            ...(parentNote.children || []),
                            action.payload.id,
                        ],
                    },
                    ...state.notes.slice(parentNodeIndex + 1),
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        content: "",
                        parent: parentNote.id,
                    },
                ],
            };
        }
        case "UPDATE_NOTE_TITLE": {
            const targetNoteIndex = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );
            // 対象のnoteが見つからなかったらなにもしない
            if (targetNoteIndex === -1) return state;

            const targetNote = state.notes[targetNoteIndex];

            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, targetNoteIndex),
                    {
                        ...targetNote,
                        title: action.payload.title,
                    },
                    ...state.notes.slice(targetNoteIndex + 1),
                ],
            };
        }
        case "UPDATE_NOTE_CONTENT": {
            const targetNoteIndex = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );
            // 対象のnoteが見つからなかったらなにもしない
            if (targetNoteIndex === -1) return state;

            const targetNote = state.notes[targetNoteIndex];

            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, targetNoteIndex),
                    {
                        ...targetNote,
                        content: action.payload.content,
                    },
                    ...state.notes.slice(targetNoteIndex + 1),
                ],
            };
        }
        default:
            return state;
    }
};
