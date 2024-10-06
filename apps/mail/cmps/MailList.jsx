
import { MailPreview } from "./MailPreview.jsx"


export function MailList({ mails, onRemoveMail, setUnreadMailsCount }) {
    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview
                        mail={mail}
                        onRemoveMail={onRemoveMail}
                        setUnreadMailsCount={setUnreadMailsCount}

                    />
                </li>
            )}
        </ul>
    )
}
