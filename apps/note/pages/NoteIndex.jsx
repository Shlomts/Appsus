const { useEffect, useState } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { NoteCompose } from "../cmps/NoteCompose.jsx"
import { noteService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ createdAt: -1 })

    // useEffect(() => {
    //     loadNotes()
    // }, [filterBy, sortBy])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService
            .query(filterBy, sortBy)
            .then(setNotes)
            .catch((err) => {
                console.log("Problem getting mails", err)
            })
    }

    if (!notes) return <h1>Loading...</h1>

    return (
        <section className="note-index">
            <NoteCompose />
            <NoteList notes={notes} />
        </section>
    )
}
