"use strict"

import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = "noteDB"

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
    getDefaultSort,
    debounce,
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(NOTE_KEY).then((notes) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, "i")
            notes = notes.filter(
                (note) =>
                    regExp.test(note.subject) ||
                    regExp.test(note.body) ||
                    regExp.test(note.from)
            )
        }
        if (filterBy.isRead !== "") {
            notes = notes.filter(
                (note) => note.isRead === (filterBy.isRead === "true")
            )
        }

        if (filterBy.isStarred) {
            notes = notes.filter((note) => note.isStared === filterBy.isStared)
        }

        if (filterBy.folder) {
            notes = notes.filter((note) => {
                if (filterBy.folder === "inbox") {
                    return !note.removedAt && !note.sentAt && !note.isDraft
                } else if (filterBy.folder === "starred") {
                    return note.isStarred
                } else if (filterBy.folder === "sent") {
                    return note.sentAt && !note.removedAt
                } else if (filterBy.folder === "drafts") {
                    return note.isDraft && !note.removedAt
                } else if (filterBy.folder === "trash") {
                    return note.removedAt
                }
            })
        }

        if (filterBy.labels) {
            notes = notes.filter((note) => note.labels === filterBy.labels)
        }

        if (sortBy.createdAt !== undefined) {
            notes.sort(
                (note1, note2) =>
                    (note1.createdAt - note2.createdAt) * sortBy.createdAt
            )
        }

        if (sortBy.subject !== undefined) {
            notes.sort(
                (note1, note2) =>
                    note1.subject.localeCompare(note2.subject) * sortBy.subject
            )
        }

        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then((note) => note)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote("title me babe", "Fullstack Me Baby!"),
            _createNote("halo", "Love ya!, Hate you!, See you later!, TOV","todos"),
            _createNote(
                "My Zigzag",
                "https://static.wixstatic.com/media/b3d0df_c4208c69a5f342d88c0fdb6089cc8159~mv2.jpg/v1/fill/w_520,h_693,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b3d0df_c4208c69a5f342d88c0fdb6089cc8159~mv2.jpg",
                "img"
            ),
            _createNote(
                "My Monster",
                "https://www.plantit.co.il/wp-content/uploads/%D7%9E%D7%95%D7%A0%D7%A1%D7%98%D7%A8%D7%94-XL-.jpg",
                "img"
            ),
            _createNote(
                "Lo Hashuv",
                "https://www.youtube.com/watch?v=XX4g3pW5ArE&t=5s",
                "video"
            ),
            _createNote("money mezumani", "Give me money"),
            _createNote("yentel rocks", "Papa can you hear me?"),
            _createNote(
                "Mi Presidente",
                "https://freedomfest.com/wp-content/uploads/2024/04/Javier-Milei-e1712674101284.jpg",
                "img"
            ),
            _createNote("hi there", "BLA BLA BLA yada yada yada"),
            _createNote(
                "Merhav Mugan",
                "https://www.youtube.com/watch?v=z8vJckzW55Q",
                "video"
            ),
            _createNote(
                "For dark days",
                "https://www.youtube.com/watch?v=BKMmLqv0IXA",
                "video"
            ),
            _createNote("Chen Levavi", "the one and only"),
            _createNote("Shlomit Horn", "& co."),
            _createNote(
                "The Chosen One",
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/af56a42d-a2b2-4c90-a0f5-a53912b3d2d9/d3fh957-3a7a2679-deee-4ab7-8eda-ca43b3ef66e7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FmNTZhNDJkLWEyYjItNGM5MC1hMGY1LWE1MzkxMmIzZDJkOVwvZDNmaDk1Ny0zYTdhMjY3OS1kZWVlLTRhYjctOGVkYS1jYTQzYjNlZjY2ZTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.e2OstPDeZdFP7kdMn34papd8Imvvu3X_F2Vi2RUbZP4",
                "img"
            ),
            _createNote(
                "The Unlimited Power",
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/05ee2e46-dd93-4032-b505-a4075bfe4467/d4zusrx-41473b14-6bf4-4f02-a397-08d2a5b4c8ab.jpg/v1/fill/w_900,h_515,q_75,strp/power__unlimited_power____by_wishker_d4zusrx-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTE1IiwicGF0aCI6IlwvZlwvMDVlZTJlNDYtZGQ5My00MDMyLWI1MDUtYTQwNzViZmU0NDY3XC9kNHp1c3J4LTQxNDczYjE0LTZiZjQtNGYwMi1hMzk3LTA4ZDJhNWI0YzhhYi5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.66Z9ZMWIUgc4eDYjd4yxoPiXZkgyXSmPosL-MrDC88o",
                "img"
            ),

        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, txt, type = "txt") {
    const note = getEmptyNote(title, txt)
    note.id = utilService.makeId()
    note.type = type
    note.style.backgroundColor = getRandomNoteColor()
    return note
}

function getEmptyNote(title = " ", body = " ") {
    return {
        createdAt: new Date(),
        type: "txt",
        isPinned: false,
        style: {
            backgroundColor: "transparent",
        },
        info: {
            title,
            body,
        },
    }
}

function getDefaultFilter() {
    return {
        folder: "inbox",
        txt: "",
        isRead: "",
        isStarred: null,
        lables: [],
    }
}

function getDefaultSort() {
    return {
        createdAt,
        subject,
    }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get("txt") || ""
    const minSpeed = searchParams.get("minSpeed") || ""
    return {
        txt,
        minSpeed,
    }
}

function getRandomNoteColor(){
    const colors = [
        "transparent", //Default
        "#f39f76", //coral
        "#faafa8", //peach
        "#fff8b8", //sand
        "#e2f6d3", //mint
        "#b4ddd3", //sage
        "#d4e4ed", //fog
        "#aeccdc", //storm
        "#d3bfdb", //dusk
        "#f6e2dd", //blossom
        "#e9e3d4", //clay
        "#efeff1", //chalk
    ]

    let num = utilService.getRandomIntInclusive(0, colors.length-1)

    return colors[num]
}

function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

