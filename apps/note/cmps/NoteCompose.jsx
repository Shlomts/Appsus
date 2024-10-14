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

    const [isExpended, setIsExpended] = useState(false)

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
        setIsExpended(true)
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

    function onDuplicateNote() {
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
                setIsExpended(false)
            })
    }

    return (
        <div
            className={`note-compose ${isExpended ? "expended" : "compact"}`}
            style={{ backgroundColor }}
        >
            {isExpended ? (
                <form onSubmit={onSaveNote}>
                    <input
                        value={title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        placeholder="Title"
                    />

                    <input
                        value={body}
                        onChange={handleChange}
                        type="text"
                        name="body"
                        placeholder={placeholderMsg}
                    />

                    <div className="compose-actions">
                        <section className="tool-bar">
                            <ColorInput
                                showColorsPalette={showColorsPalette}
                                toggleColorsPallete={toggleColorsPallete}
                                onSetNoteStyle={onSetNoteStyle}
                            />
                            <button
                                onClick={onPinNote}
                                className="fa-solid fa-thumbtack"
                            ></button>
                            {note && (
                                <button
                                    onClick={onDuplicateNote}
                                    className="fa-regular fa-copy"
                                ></button>
                            )}
                            <button className="fa-regular fa-floppy-disk" type="submmit"/>
                            {!note && (
                                <button className="fa-regular fa-trash-can" onClick={() => setIsExpended(false)}/>
                            )}
                        </section>
                    </div>
                </form>
            ) : (
                <div
                    className="compact-compose"
                    onClick={() => setIsExpended(true)}
                >
                    <p>New note...</p>
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
                </div>
            )}
        </div>
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
