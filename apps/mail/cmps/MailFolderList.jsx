const { useEffect, useState } = React

export function MailFolderList({ onSetFilterBy, unreadMailsCount }) {

    const [selectedFolder, setSelectedFolder] = useState(null)

    function onSelectFolder(ev) {
        const folder = ev.target.value
        setSelectedFolder(folder)
        onSetFilterBy({ folder })
    }

    return (
        <nav className="mail-folder-list">
            <button className={selectedFolder === 'inbox' ? 'active' : ''}
                onClick={onSelectFolder} value='inbox'>
                <span className="fa-solid fa-inbox"></span>
                Inbox ({unreadMailsCount})
            </button>
            <button className={selectedFolder === 'starred' ? 'active' : ''}
                onClick={onSelectFolder} value='starred'>
                <span className="fa-regular fa-star"></span>
                Starred
            </button>
            <button className={selectedFolder === 'sent' ? 'active' : ''}
                onClick={onSelectFolder} value='sent'>
                <span className="fa-regular fa-paper-plane"></span>
                Sent
            </button>
            <button className={selectedFolder === 'drafts' ? 'active' : ''}
                onClick={onSelectFolder} value='drafts'>
                <span className="fa-regular fa-file"></span>
                Drafts
            </button>
            <button className={selectedFolder === 'trash' ? 'active' : ''}
                onClick={onSelectFolder} value='trash'>
                <span className="fa-regular fa-trash-can"></span>
                Trash
            </button>
        </nav>
    )
}
