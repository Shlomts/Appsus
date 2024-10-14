import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, onSelectNote, onRemoveNote }) {
    let pinnedNotes = onlyIsPinned(notes, true)
    let notPinnedNotes = onlyIsPinned(notes, false)

    function onlyIsPinned(notes, isPinned) {
        return notes.filter((note) => note.isPinned === isPinned)
    }

    return (
        <section className="note-list">
            {pinnedNotes && pinnedNotes.length > 0 && (
                <section className="pinned">
                    {pinnedNotes.map((note) => (
                        <article key={note.id} className="note">
                            <NotePreview
                                note={note}
                                onSelectNote={onSelectNote}
                                onRemoveNote={onRemoveNote}
                            />
                        </article>
                    ))}
                </section>
            )}

            <section className="not-pinned">
                {notPinnedNotes.map((note) => (
                    <article key={note.id} className="note">
                        <NotePreview
                            note={note}
                            onSelectNote={onSelectNote}
                            onRemoveNote={onRemoveNote}
                        />
                    </article>
                ))}
            </section>
            {/* 
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
            ))} */}
        </section>
    )
}
