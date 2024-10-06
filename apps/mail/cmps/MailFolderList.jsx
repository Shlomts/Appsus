export function MailFolderList({ onSetFilterBy, unreadMailsCount }) {
    function onSelectFolder(ev) {
        const folder = ev.target.value
        onSetFilterBy({ folder })
    }

    return (
        <nav className="mail-folder-list">
            <button onClick={onSelectFolder} value="inbox">
                Inbox ({unreadMailsCount})
            </button>
            <button onClick={onSelectFolder} value="starred">
                Starred
            </button>
            <button onClick={onSelectFolder} value="sent">
                Sent
            </button>
            <button onClick={onSelectFolder} value="drafts">
                Drafts
            </button>
            <button onClick={onSelectFolder} value="trash">
                Trash
            </button>
        </nav>
    )
}
