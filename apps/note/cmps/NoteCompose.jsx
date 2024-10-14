const { useState, useEffect, Fragment } = React

import { noteService } from "../services/note.service.js"
import { ColorInput } from "../cmps/ColorInput.jsx"

export function NoteCompose({ loadNotes, note, setCurrNote }) {
    const [composeNote, setComposeNote] = useState(noteService.getEmptyNote())

    const [title, setTilte] = useState("")
    const [body, setBody] = useState("")

    const [currCmpType, setCurrCmpType] = useState("txt")
    const [placeholderMsg, setPlaceholderMsg] = useState("What's on your mind?")

    const [currIsPinned, setCurrIsPinned] = useState(false)

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
        setCurrCmpType(note.type)
        setCurrIsPinned(note.isPinned)
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

    function onChangeCmpType({ target }) {
        const value = target.value
        const msg = _creatPlaceholderMsg(value)
        setPlaceholderMsg(msg)
        setCurrCmpType(value)
    }

    function onSetNoteStyle(color) {
        setBackgroundColor(color)
    }

    function toggleColorsPallete() {
        setShowColorsPalette((prevShowColorsPalette) => !prevShowColorsPalette)
    }

    function onDuplicateNote(){
        composeNote.id = null
    }
    
    function onPinNote(ev) {
        ev.preventDefault()
        setCurrIsPinned((prevPin) => !prevPin)
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        composeNote.style.backgroundColor = backgroundColor
        composeNote.type = currCmpType
        composeNote.isPinned = currIsPinned

        noteService
            .save(composeNote)
            .then((note) => {})
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
                setCurrCmpType("txt")
                setPlaceholderMsg("What's on your mind?")
            })
    }

    return (
        <Fragment>
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
                        placeholder={placeholderMsg}
                    ></input>
                </label>

                <section className="tool-bar">
                    <ColorInput
                        showColorsPalette={showColorsPalette}
                        toggleColorsPallete={toggleColorsPallete}
                        onSetNoteStyle={onSetNoteStyle}
                    />
                    <button onClick={onPinNote} className="fa-solid fa-thumbtack"></button>
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

            {note && (
                <button onClick={onDuplicateNote} className="fa-regular fa-copy"></button>
            )}
            {!note && (
                <section className="cmpTypeOpts">
                    <button
                        onClick={onChangeCmpType}
                        value="txt"
                        className="fa-solid fa-font"
                    />
                    <button
                        onClick={onChangeCmpType}
                        value="img"
                        className="fa-regular fa-image"
                    />
                    <button
                        onClick={onChangeCmpType}
                        value="video"
                        className="fa-brands fa-youtube"
                    />
                    <button
                        onClick={onChangeCmpType}
                        value="todos"
                        className="fa-regular fa-square-check"
                    />
                </section>
            )}
        </Fragment>
    )
}

function _creatPlaceholderMsg(type) {
    switch (type) {
        case "txt":
            return "What's on your mind?"
        case "img":
            return "Enter image URL..."
        case "video":
            return "Enter Youtube URL..."
        case "todos":
            return "Enter comma separated tasks..."
    }
}
