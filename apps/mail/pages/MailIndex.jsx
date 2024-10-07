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
    const [sortBy, setSortBy] = useState({ createdAt: -1 })
    const [showForm, setShowForm] = useState(false)
    const [unreadMailsCount, setUnreadMailsCount] = useState(0)

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    useEffect(() => {
        countUnreads()
    }, [mails])

    function loadMails() {
        mailService
            .query(filterBy, sortBy)
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
                .then(() => {
                    loadMails()
                    // showSuccessMsg(`Car removed successfully!`)
                })
                .catch((err) => {
                    console.log("err:", err)
                })
            console.log(`done`)
        }
    }

    function toggleComposeForm() {
        setShowForm((prevShowForm) => !prevShowForm)
    }

    function countUnreads() {
        if (!mails) return <h1>Loading...</h1>

        const newUnreadCount = mails.filter((mail) => mail.isRead === false)

        setUnreadMailsCount(newUnreadCount.length)
    }

    if (!mails) return <h1>Loading...</h1>

    return (
        <section className="mail-index">
            <button onClick={toggleComposeForm}>Compose</button>
            {showForm && <MailCompose toggleComposeForm={toggleComposeForm} />}
            <MailFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
                setSortBy={setSortBy} />
            <MailFolderList
                onSetFilterBy={onSetFilterBy}
                unreadMailsCount={unreadMailsCount}
            />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                setUnreadMailsCount={setUnreadMailsCount}
            />
        </section>
    )
}
