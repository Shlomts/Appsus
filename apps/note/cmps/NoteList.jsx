import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({notes, onRemoveNote}) {
    return (
        <section className="note-list">
            {notes.map((note) => (
                // console.log(note),
                // console.log(note.id)
                <article key={note.id}>
                    <NotePreview
                        note={note}
                        // onRemoveNote={onRemoveNote}
                    />
                    <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                </article>
            ))}
        </section>
    )
}
