const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { ColorInput } from "../cmps/ColorInput.jsx"

export function NoteCompose({ loadNotes, note, setCurrNote }) {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())
    const [title, setTilte] = useState("")
    const [body, setBody] = useState("")

    const [showColorsPalette, setShowColorsPalette] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState(
        composeNote.style.backgroundColor
    )

    useEffect(() => {
        loadNotes()
    }, [])

    if (note && !title && !body) {
        setTilte(note.info.title)
        setBody(note.info.body)
        setBackgroundColor(note.style.backgroundColor)
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

    function onSetNoteStyle(color) {
        setBackgroundColor(color)
    }

    function toggleColorsPallete() {
        setShowColorsPalette((prevShowColorsPalette) => !prevShowColorsPalette)
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        composeNote.style.backgroundColor = backgroundColor

        noteService
            .save(composeNote)
            .then((note) => {
            })
            .catch((err) => {
                console.log("err:", err)
            })
            .finally(() => {
                //             // navigate('/car')
                if (showColorsPalette) toggleColorsPallete()
                loadNotes()
                setComposeNote(noteService.getEmptyNote())
                setCurrNote(null)
                setBackgroundColor("transparent")
            })
    }

    return (
        <form
            style={{ backgroundColor: backgroundColor }}
            onSubmit={onSaveNote}
            className="note-compose"
        >
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

            <section className="tool-bar">
                <ColorInput
                    showColorsPalette={showColorsPalette}
                    toggleColorsPallete={toggleColorsPallete}
                    onSetNoteStyle={onSetNoteStyle}
                />

                <button>Save</button>
            </section>

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
