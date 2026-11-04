import { useEffect, useState } from "react";

const palettes = [
  { id: "baseline", name: "Teal baseline", colors: ["#080908", "#F0F0EA", "#75B8BA"] },
  { id: "sky", name: "Sky pop", colors: ["#0EA5E9", "#FFFFFF", "#EC4899"] },
  { id: "night", name: "Night signal", colors: ["#000000", "#2563EB", "#F97316"] },
  { id: "deep", name: "Deep bloom", colors: ["#0F172A", "#FFFFFF", "#F472B6"] },
  { id: "seal", name: "Seal and crimson", colors: ["#2A5769", "#071426", "#E11D48"] },
] as const;

type PaletteId = (typeof palettes)[number]["id"];

function readPalette(): PaletteId {
  const saved = localStorage.getItem("krish-palette-v2");
  return palettes.some((palette) => palette.id === saved) ? saved as PaletteId : "deep";
}

export default function PaletteLab() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<PaletteId>(readPalette);

  useEffect(() => {
    if (palette === "baseline") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = palette;
    localStorage.setItem("krish-palette-v2", palette);
  }, [palette]);

  return (
    <aside className={`palette-lab ${open ? "palette-lab-open" : ""}`} aria-label="Local color palette preview">
      <button
        type="button"
        className="palette-lab-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="palette-options"
      >
        <span className="palette-lab-mark" aria-hidden="true" />
        Color lab
      </button>

      {open && (
        <div id="palette-options" className="palette-lab-panel">
          <div className="palette-lab-heading">
            <p>Local preview</p>
            <span>Base / support / accent</span>
          </div>
          <div className="palette-options">
            {palettes.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`palette-option ${palette === option.id ? "palette-option-active" : ""}`}
                onClick={() => setPalette(option.id)}
                aria-pressed={palette === option.id}
              >
                <span className="palette-swatches" aria-hidden="true">
                  {option.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
                </span>
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
