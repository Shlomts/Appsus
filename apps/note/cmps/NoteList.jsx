import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onSelectNote, onRemoveNote }) {
    return (
        <section className="note-list">
            {notes.map((note) => (
                <article key={note.id} className="note">
                    <NotePreview
                        note={note}
                        onSelectNote={onSelectNote}
                        // onRemoveNote={onRemoveNote}
                    />
                    <button onClick={() => onRemoveNote(note.id)}>
                        Remove
                    </button>
                </article>
            ))}
        </section>
    )
}
