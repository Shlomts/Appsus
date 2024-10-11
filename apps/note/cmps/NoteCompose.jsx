const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NoteCompose({ loadNotes, note, setCurrNote }) {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())
    const [title, setTilte] = useState("")
    const [body, setBody] = useState("")

    console.log(note)

    useEffect(() => {
        loadNotes()
    }, [])

    if (note && !title && !body) {
        setTilte(note.info.title)
        setBody(note.info.body)
        setComposeNote(note)
    }

    useEffect(() => {
        setTilte("")
        setBody("")
    }, [composeNote])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === "title") setTilte(value)
        if (field === "body") setBody(value)

        setComposeNote((prevComposeNote) => {
            prevComposeNote.info[field] = value
            return prevComposeNote
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService
            .save(composeNote)
            .then((note) => {
                console.log("nte", note)
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                //             // navigate('/car')
                loadNotes()
                setComposeNote(noteService.getEmptyNote())
                setCurrNote(null)
            })
    }

    return (
        <form onSubmit={onSaveNote} className="note-compose">
            {/* <header className="header">
                    <h2>New Note</h2>
                    <button
                        onClick={(ev) => {
                            ev.preventDefault
                            onDraft()
                            toggleComposeForm()
                        }}
                        className="fa-solid fa-xmark"
                    ></button>
                </header> */}
            <label htmlFor="title">
                <input
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Title"
                ></input>
            </label>
            <label htmlFor="txt">
                <input
                    value={body}
                    onChange={handleChange}
                    type="text"
                    name="body"
                    placeholder="New note..."
                ></input>
            </label>
            <button>Save</button>
            {/* <button
                        className="fa-regular fa-trash-can"
                        onClick={(ev) => {
                            ev.preventDefault
                            toggleComposeForm()
                        }}
                    ></button> */}
        </form>
    )
}
