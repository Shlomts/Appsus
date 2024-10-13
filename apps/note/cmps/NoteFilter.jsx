export function NoteFilter({ toggleSideBar }) {
    return (
        <section className="note-filter">
            <section className="filter-header">
                <section className="gmail-logo">
                    <button onClick={toggleSideBar} className="hamburger fa-solid fa-bars">   </button>
                    <img src="https://img.icons8.com/color/48/google-keep.png" alt="gmail-keep-icon"></img>
                    <span>Mister Keep</span>
                </section>
            </section>
        </section>
    )
}