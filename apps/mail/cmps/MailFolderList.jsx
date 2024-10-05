const { Link } = ReactRouterDOM

export function MailFolderList() {

    return (
        <nav className="mail-folder-list">
            <h2>Mail list</h2>
            <Link to="/mail/compose"><button>+ Compose</button></Link>
            <Link to="/mail/inbox"><button>Inbox</button></Link>
            <Link to="/mail/starred"><button>Starred</button></Link>
            <Link to="/mail/sent"><button>Sent</button></Link>
            <Link to="/mail/draftes"><button>Drafts</button></Link>
            <Link to="/mail/trash"><button>Trash</button></Link>
        </nav>
    )
}
