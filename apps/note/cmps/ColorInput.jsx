
const { useState } = React

export function ColorInput({ showColorsPalette, toggleColorsPallete, onSetNoteStyle, backgroundColor }) {
    
    const colors = [
        "transparent", //Default
        "#f39f76", //coral
        "#faafa8", //peach
        "#fff8b8", //sand
        "#e2f6d3", //mint
        "#b4ddd3", //sage
        "#d4e4ed", //fog
        "#aeccdc", //storm
        "#d3bfdb", //dusk
        "#f6e2dd", //blossom
        "#e9e3d4", //clay
        "#efeff1", //chalk
    ]

    function onSetColor(color) {
        // const newStyle = { backgroundColor: color }
        onSetNoteStyle(color)
    }


    return (
        <section className="color-input">
            <span onClick={toggleColorsPallete} className="fa-solid fa-palette"></span>
            { showColorsPalette && (
                            <div className="colors-container">
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`item ${
                            color === backgroundColor ? "chosen" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
            )}

        </section>
    )
}
