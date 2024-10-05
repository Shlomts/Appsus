
export function MailFolderList({ onSetFilterBy }) {

    function onSelectFolder(ev) {
        const folder = ev.target.value
        onSetFilterBy({ folder })
    }

    return (
        <nav className="mail-folder-list">
            <h2>Mail list</h2>
            <button onClick={onSelectFolder} value="inbox">Inbox</button>
            <button onClick={onSelectFolder} value="starred">Starred</button>
            <button onClick={onSelectFolder} value="sent">Sent</button>
            <button onClick={onSelectFolder} value="drafts">Drafts</button>
            <button onClick={onSelectFolder} value="trash">Trash</button>
        </nav>
    )
}
