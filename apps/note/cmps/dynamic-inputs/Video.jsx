export function Video({ videoUrl }) {
    const embedId = extractEmbedID(videoUrl)

    function extractEmbedID(url) {
        return url.split("v=")[1].split("&")[0]
    }

    return (
        <div className="video-responsive">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}
