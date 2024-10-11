import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = "mailDB"
export const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    debounce,
    getDefaultSort,
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(MAIL_KEY).then((mails) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, "i")
            mails = mails.filter(
                (mail) =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.from)
            )
        }
        if ("isRead" in filterBy && filterBy.isRead !== "") {
            mails = mails.filter(
                (mail) => mail.isRead === (filterBy.isRead === "true")
            )
        }

        if ("isStarred" in filterBy && filterBy.isStarred !== null) {
            mails = mails.filter(
                (mail) => mail.isStarred === filterBy.isStarred
            )
        }

        if ("folder" in filterBy && filterBy.folder) {
            mails = mails.filter((mail) => {
                if (filterBy.folder === "inbox") {
                    return !mail.removedAt && !mail.sentAt && !mail.isDraft
                } else if (filterBy.folder === "starred") {
                    return mail.isStarred
                } else if (filterBy.folder === "sent") {
                    return mail.sentAt && !mail.removedAt
                } else if (filterBy.folder === "drafts") {
                    return mail.isDraft && !mail.removedAt
                } else if (filterBy.folder === "trash") {
                    return mail.removedAt
                }
            })
        }

        if ("labels" in filterBy && filterBy.labels) {
            mails = mails.filter((mail) => mail.labels === filterBy.labels)
        }

        if ("createdAt" in sortBy && sortBy.createdAt !== undefined) {
            mails.sort(
                (mail1, mail2) =>
                    (mail1.createdAt - mail2.createdAt) * sortBy.createdAt
            )
        }

        if ("subject" in sortBy && sortBy.subject !== undefined) {
            mails.sort(
                (mail1, mail2) =>
                    mail1.subject.localeCompare(mail2.subject) * sortBy.subject
            )
        }

        return mails
    })
}

function get(mailId) {
    return storageService
        .get(MAIL_KEY, mailId)
        .then((mail) => _setNextPrevMailId(mail))
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = "", body = "", from = "", to = "") {
    return {
        createdAt: new Date(),
        subject,
        body,
        isRead: false,
        isDraft: false,
        sentAt: null,
        removedAt: null,
        to,
        from,
        isStarred: false,
        labels: [],
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

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail(
                "Urgent: Assistance Needed for Family Estate!",
                "Would love to catch up sometimes",
                "momo@momo.com"
            ),
            _createMail(
                "Hate you!",
                "Would hate to catch up sometimes",
                "hobo@hobo.com"
            ),
            _createMail(
                "Give me money",
                "Would love to get money",
                "toto@toto.com"
            ),
            _createMail(
                "Papa can you hear me?",
                "Its me yentel",
                "yentel@yentelF.com"
            ),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from) {
    const mail = getEmptyMail(subject, body, from)
    mail.id = utilService.makeId()
    return mail
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get("txt") || ""
    const minSpeed = searchParams.get("minSpeed") || ""
    return {
        txt,
        minSpeed,
    }
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {

        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1]
            ? mails[mailIdx - 1]
            : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id

        return mail
    })
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
