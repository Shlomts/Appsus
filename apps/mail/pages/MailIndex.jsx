const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailPreview } from "../cmps/MailPreview.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService
            .query(filterBy)
            .then(setMails)
            .catch((err) => {
                console.log("Problem getting mails", err)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy((preFilter) => ({ ...preFilter, ...newFilter }))
    }

    function onRemoveMail(ev, mailId) {
        ev.preventDefault()

        const mail = mails.filter((mails) => mails.id === mailId)[0]

        if (mail.removedAt) {
            mailService
                .remove(mailId)
                .then(() => {
                    setMails((mails) =>
                        mails.filter((mails) => mails.id !== mailId)
                    )
                    // showSuccessMsg(`Car removed successfully!`)
                })
                .catch((err) => {
                    console.log("Problems removing mail:", err)
                    // showErrorMsg(`Problems removing mail (${mailId})`)
                })
        } else {
            mail.removedAt = new Date()

            const newMail = { ...mail, removedAt: new Date() }
            mailService
                .save(newMail)
                .then(setMails(mails))
                .catch((err) => {
                    console.log("err:", err)
                })
            console.log(`done`)
        }
    }

    function toggleComposeForm() {
        setShowForm((prevShowForm) => !prevShowForm)
    }

    if (!mails) return <h1>Loading...</h1>

    const unreadCount = countUnreads()

    function countUnreads() {
        let count = 0
        if (!mails) return 0

        for (let i = 0; i < mails.length; i++) {
            if (!mails[i].isRead) count++
        }

        return count
    }

    return (
        <section className="mail-index">
            <button onClick={toggleComposeForm}>Compose</button>
            {showForm && <MailCompose toggleComposeForm={toggleComposeForm} />}
            <MailFolderList
                onSetFilterBy={onSetFilterBy}
                unreadCount={unreadCount}
            />
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            {/* <p className="unread-count">Unread: {unreadCount}</p> */}
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>
    )
}
