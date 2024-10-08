export function NotePreview({note}) {

    console.log(note)

    return (
        <article className="note-preview">
            <title>New note</title>
            <p>{note.info.txt}</p>
        </article>
    )
}