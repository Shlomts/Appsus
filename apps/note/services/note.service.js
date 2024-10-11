'use strict'

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
    return storageService
        .get(NOTE_KEY, noteId)
        .then((note) => note)
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
            _createNote(
                "title me bitch",
                "Fullstack Me Baby!"
            ),
            _createNote(
                "halo",
                "Hate you!"
            ),
            _createNote(
                "money mezumani",
                "Give me money"
            ),
            _createNote(
                "yentel rocks",
                "Papa can you hear me?"
            ),
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, txt) {
    const note = getEmptyNote(title, txt)
    note.id = utilService.makeId()
    return note
}

function getEmptyNote(title = " " ,body = " ") {
    return {
        createdAt: new Date(),
        type: "txt",
        isPinned: false,
        style: {
            backgroundColor: "#00d",
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


function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}
