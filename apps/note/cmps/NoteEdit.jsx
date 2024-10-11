import { NoteCompose } from "../cmps/NoteCompose.jsx"

export function NoteEdit({ loadNotes, note, setCurrNote }) {
    return (
        <dialog open>
            <div className="content">
                <NoteCompose loadNotes={loadNotes} note={note} setCurrNote={setCurrNote} />
            </div>
        </dialog>
    )
}
