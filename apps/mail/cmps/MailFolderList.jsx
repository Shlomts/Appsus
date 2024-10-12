const { useEffect, useState } = React
const { useNavigate } = ReactRouter

export function MailFolderList({ onSetFilterBy, unreadMailsCount, showSideBar }) {

    const [selectedFolder, setSelectedFolder] = useState(null)
    const navigate = useNavigate()

    function onSelectFolder(folder) {
        setSelectedFolder(folder)
        onSetFilterBy({ folder })

        console.log(`Selected folder: ${folder}`)

        switch (folder) {
            case 'inbox':
                navigate('/mail/inbox')
                break;
            case 'starred':
                navigate('/mail/starred')
                break;
            case 'sent':
                navigate('/mail/sent')
                break;
            case 'drafts':
                navigate('/mail/drafts')
                break;
            case 'trash':
                navigate('/mail/trash')
                break;
        }
    }

    return (
        <nav className="mail-folder-list">

            <button className={selectedFolder === 'inbox' ? 'active' : ''}
                onClick={() => onSelectFolder('inbox')}>
                {/* onClick={onSelectFolder} value='inbox'> */}
                <span className="fa-solid fa-inbox"></span>
                {showSideBar && <span>Inbox ({unreadMailsCount})</span>}
            </button>

            <button className={selectedFolder === 'starred' ? 'active' : ''}
                onClick={() => onSelectFolder('starred')}>
                {/* onClick={onSelectFolder} value='starred'> */}
                <span className="fa-regular fa-star"></span>
                {showSideBar && <span>Starred</span>}
            </button>

            <button className={selectedFolder === 'sent' ? 'active' : ''}
                onClick={() => onSelectFolder('sent')}>
                {/* onClick={onSelectFolder} value='sent'> */}
                <span className="fa-regular fa-paper-plane"></span>
                {showSideBar && <span>Sent</span>}
            </button>

            <button className={selectedFolder === 'drafts' ? 'active' : ''}
                onClick={() => onSelectFolder('drafts')}>
                {/* onClick={onSelectFolder} value='drafts'> */}
                <span className="fa-regular fa-file"></span>
                {showSideBar && <span>Drafts</span>}
            </button>

            <button className={selectedFolder === 'trash' ? 'active' : ''}
                onClick={() => onSelectFolder('trash')}>
                {/* onClick={onSelectFolder} value='trash'> */}
                <span className="fa-regular fa-trash-can"></span>
                {showSideBar && <span>Trash</span>}
            </button>
        </nav>
    )
}
