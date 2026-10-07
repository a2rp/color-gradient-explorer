import { FiBookmark, FiCopy, FiMinus, FiPlus, FiRotateCcw } from "react-icons/fi";
import { gradientPresets, startingGradient } from "../../data/gradientPresets.js";
import { getGradientCss, getGradientRule } from "../../utils/gradientCss.js";
import styles from "./styles.module.css";

const GradientEditor = ({ gradient, onChange, onStatus, onSave }) => {
    const orderedStops = [...gradient.stops].sort(
        (first, second) => first.position - second.position,
    );
    const gradientCss = getGradientCss(gradient);
    const gradientRule = getGradientRule(gradient);

    const updateGradient = (changes) => {
        onChange({ ...gradient, ...changes });
    };

    const updateStop = (stopId, changes) => {
        updateGradient({
            stops: gradient.stops.map((stop) =>
                stop.id === stopId ? { ...stop, ...changes } : stop,
            ),
        });
    };

    const addStop = () => {
        if (gradient.stops.length >= 5) return;

        const gaps = orderedStops.map((stop, index) => ({
            start: stop.position,
            end:
                index === orderedStops.length - 1
                    ? 100
                    : orderedStops[index + 1].position,
        }));
        gaps.unshift({ start: 0, end: orderedStops[0].position });
        const largestGap = gaps.reduce((largest, gap) =>
            gap.end - gap.start > largest.end - largest.start ? gap : largest,
        );

        updateGradient({
            stops: [
                ...gradient.stops,
                {
                    id: "stop-" + Date.now(),
                    color: "#F7B84B",
                    position: Math.round((largestGap.start + largestGap.end) / 2),
                },
            ],
        });
        onStatus("A new color stop was added.");
    };

    const removeStop = (stopId) => {
        if (gradient.stops.length <= 2) return;

        updateGradient({
            stops: gradient.stops.filter((stop) => stop.id !== stopId),
        });
        onStatus("Color stop removed.");
    };

    const applyPreset = (preset) => {
        onChange({
            ...preset,
            stops: preset.stops.map((stop) => ({ ...stop })),
        });
        onStatus(preset.name + " is ready to edit.");
    };

    const resetGradient = () => {
        onChange({
            ...startingGradient,
            stops: startingGradient.stops.map((stop) => ({ ...stop })),
        });
        onStatus("The starting gradient is restored.");
    };

    const copyCss = async () => {
        try {
            await navigator.clipboard.writeText(gradientRule);
            onStatus("CSS copied to clipboard.");
        } catch {
            onStatus("Clipboard access is unavailable. Select and copy the CSS below.");
        }
    };

    return (
        <section
            className={styles.gradientEditor}
            id="studio"
            aria-labelledby="studio-title"
        >
            <div className={styles.editorHeading}>
                <div>
                    <h1 id="studio-title">Build a gradient.</h1>
                    <p>Adjust the colors and direction, then copy the CSS into your project.</p>
                </div>
                <div className={styles.headingActions}>
                    <button
                        className={styles.saveButton}
                        type="button"
                        onClick={onSave}
                    >
                        <FiBookmark aria-hidden="true" />
                        Save gradient
                    </button>
                    <button
                        className={styles.resetButton}
                        type="button"
                        onClick={resetGradient}
                    >
                        <FiRotateCcw aria-hidden="true" />
                        Reset
                    </button>
                </div>
            </div>

            <div className={styles.editorGrid}>
                <div className={styles.previewColumn}>
                    <div className={styles.previewHeader}>
                        <div>
                            <h2>Preview your blend</h2>
                            <p>Your changes appear here as you edit.</p>
                        </div>
                        <span className={styles.liveStatus}>
                            <span aria-hidden="true" />
                            Live preview
                        </span>
                    </div>

                    <div className={styles.previewCanvas} style={{ background: gradientCss }}>
                        <div className={styles.previewOrbOne} aria-hidden="true" />
                        <div className={styles.previewOrbTwo} aria-hidden="true" />
                        <div className={styles.previewContent}>
                            <span className={styles.previewLabel}>Prism / color study</span>
                            <h2>Color makes a mood.</h2>
                            <p>Try your blend on a simple sample card.</p>
                            <div className={styles.previewDetails}>
                                <span>Fresh ideas</span>
                                <span className={styles.previewDot} aria-hidden="true" />
                                <span>Good energy</span>
                            </div>
                        </div>
                        <div className={styles.previewNumber} aria-hidden="true">
                            01
                        </div>
                    </div>

                    <div className={styles.presetSection}>
                        <div className={styles.presetHeading}>
                            <div>
                                <h2>Start with a color story</h2>
                                <p>Choose a blend, then make it your own.</p>
                            </div>
                        </div>
                        <div className={styles.presetGrid}>
                            {gradientPresets.map((preset) => (
                                <button
                                    className={styles.presetButton}
                                    type="button"
                                    key={preset.id}
                                    onClick={() => applyPreset(preset)}
                                    aria-label={"Use the " + preset.name + " gradient"}
                                >
                                    <span
                                        className={styles.presetSwatch}
                                        style={{ background: getGradientCss(preset) }}
                                    />
                                    <span className={styles.presetName}>{preset.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className={styles.controlPanel} aria-label="Gradient controls">
                    <div className={styles.panelHeading}>
                        <h2>Shape the blend</h2>
                        <p>Small adjustments can change the whole feel.</p>
                    </div>

                    <label className={styles.nameField}>
                        <span>Gradient name</span>
                        <input
                            type="text"
                            value={gradient.name}
                            maxLength={36}
                            onChange={(event) => updateGradient({ name: event.target.value })}
                        />
                    </label>

                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>Gradient type</span>
                        <div className={styles.typeButtons} role="group" aria-label="Gradient type">
                            <button
                                className={gradient.type === "linear" ? styles.activeType : ""}
                                type="button"
                                aria-pressed={gradient.type === "linear"}
                                onClick={() => updateGradient({ type: "linear" })}
                            >
                                Linear
                            </button>
                            <button
                                className={gradient.type === "radial" ? styles.activeType : ""}
                                type="button"
                                aria-pressed={gradient.type === "radial"}
                                onClick={() => updateGradient({ type: "radial" })}
                            >
                                Radial
                            </button>
                        </div>
                    </div>

                    {gradient.type === "linear" && (
                        <label className={styles.angleControl} htmlFor="gradient-angle">
                            <span>Angle</span>
                            <output>{gradient.angle}Â°</output>
                            <input
                                id="gradient-angle"
                                type="range"
                                min="0"
                                max="360"
                                value={gradient.angle}
                                onChange={(event) =>
                                    updateGradient({ angle: Number(event.target.value) })
                                }
                            />
                        </label>
                    )}

                    <div className={styles.stopHeading}>
                        <div>
                            <h3>Color stops</h3>
                            <p>{gradient.stops.length} of 5 colors</p>
                        </div>
                        <button
                            className={styles.addStopButton}
                            type="button"
                            onClick={addStop}
                            disabled={gradient.stops.length >= 5}
                        >
                            <FiPlus aria-hidden="true" />
                            Add stop
                        </button>
                    </div>

                    <div className={styles.stopList}>
                        {orderedStops.map((stop, index) => (
                            <div className={styles.stopItem} key={stop.id}>
                                <div className={styles.stopTopline}>
                                    <label htmlFor={"color-" + stop.id}>
                                        Stop {index + 1}
                                    </label>
                                    <div className={styles.stopActions}>
                                        <code>{stop.color}</code>
                                        <input
                                            id={"color-" + stop.id}
                                            type="color"
                                            value={stop.color}
                                            onChange={(event) =>
                                                updateStop(stop.id, {
                                                    color: event.target.value.toUpperCase(),
                                                })
                                            }
                                            aria-label={"Color for stop " + (index + 1)}
                                        />
                                        <button
                                            className={styles.removeStopButton}
                                            type="button"
                                            onClick={() => removeStop(stop.id)}
                                            disabled={gradient.stops.length <= 2}
                                            aria-label={"Remove color stop " + (index + 1)}
                                        >
                                            <FiMinus aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.positionControl}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={stop.position}
                                        onChange={(event) =>
                                            updateStop(stop.id, {
                                                position: Number(event.target.value),
                                            })
                                        }
                                        aria-label={
                                            "Position for color stop " + (index + 1)
                                        }
                                    />
                                    <output>{stop.position}%</output>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cssOutput}>
                        <div className={styles.cssOutputHeading}>
                            <div>
                                <h3>CSS background</h3>
                                <p>Copy the current gradient rule.</p>
                            </div>
                            <button
                                className={styles.copyButton}
                                type="button"
                                onClick={copyCss}
                            >
                                <FiCopy aria-hidden="true" />
                                Copy CSS
                            </button>
                        </div>
                        <pre>
                            <code>{gradientRule}</code>
                        </pre>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default GradientEditor;