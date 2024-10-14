export function Video({ videoUrl }) {
    const embedId = extractEmbedID(videoUrl)

    function extractEmbedID(url) {
        if (!url.includes("v=")) return null
        return url.split("v=")[1].split("&")[0]
    }

    return (
        <div className="video-responsive">
            {embedId && (
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            )}
        </div>
    )
}
