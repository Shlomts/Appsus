const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate, outlet } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "../pages/MailDetails.jsx"
import { utilService } from "../../../services/util.service.js"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState({ createdAt: -1 })
    const [showForm, setShowForm] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [unreadMailsCount, setUnreadMailsCount] = useState(0)
    const params = useParams()
    const mailId = params.mailId

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

        const mail = mails.find((mail) => mail.id === mailId)

        if (mail.removedAt) {
            mailService
                .remove(mailId)
                .then(() =>
                    setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                    // showSuccessMsg(`Car removed successfully!`)
                )
                .catch(err => console.log("Problems removing mail:", err)
                    // showErrorMsg(`Problems removing mail (${mailId})`)
                )
        } else {
            const newMail = { ...mail, removedAt: new Date() }
            mailService
                .save(newMail)
                .then(() => {
                    loadMails()
                    // showSuccessMsg(`Car removed successfully!`)
                })
                .catch((err) => {
                    console.log("err:", err)
                })
        }
    }

    function toggleComposeForm() {
        setShowForm((prevShowForm) => !prevShowForm)
    }

    function countUnreads() {
        if (!mails) return

        const storagedMails = utilService.loadFromStorage('mailDB')

        const newUnreadCount = storagedMails.filter((mail) => mail.isRead === false
            && !mail.removedAt && !mail.sentAt && !mail.isDraft)

        setUnreadMailsCount(newUnreadCount.length)
    }

    function toggleSideBar() {
        setShowSideBar((prevShowSideBar) => !prevShowSideBar)
    }

    if (!mails) return

    return (
        <section className="mail-index">
            <section className={`{left-col-layout ${showSideBar ? 'full' : 'collapsed'}`}>
                <div className={`side-bar ${showSideBar ? 'open' : ''}`}>

                    <button className={`compose-btn ${showSideBar ? '' : 'collapsed'}`}
                        onClick={toggleComposeForm}>
                        <span className="fa-solid fa-pen"></span>
                        {showSideBar && <span>Compose</span>}
                    </button>

                    {showForm && <MailCompose toggleComposeForm={toggleComposeForm} />}
                    <MailFolderList
                        onSetFilterBy={onSetFilterBy}
                        unreadMailsCount={unreadMailsCount}
                        showSideBar={showSideBar}
                    />
                </div>
            </section>

            <MailFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
                setSortBy={setSortBy}
                showSideBar={showSideBar}
                toggleSideBar={toggleSideBar}
            />

            {mailId ? (
                <MailDetails
                    mailId={mailId}
                />
            ) : (
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    loadMails={loadMails}
                />
            )}
        </section>
    )
}
