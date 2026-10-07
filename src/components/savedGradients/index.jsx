import { useEffect, useRef, useState } from "react";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { getGradientCss } from "../../utils/gradientCss.js";
import styles from "./styles.module.css";

const SavedGradients = ({ gradients, onLoad, onDelete, onCopy }) => {
    const [gradientToDelete, setGradientToDelete] = useState(null);
    const deleteTriggerRef = useRef(null);
    const dialogRef = useRef(null);
    const sectionRef = useRef(null);

    const closeDialog = () => {
        setGradientToDelete(null);
        window.requestAnimationFrame(() => deleteTriggerRef.current?.focus());
    };

    const confirmDelete = () => {
        if (!gradientToDelete) return;

        onDelete(gradientToDelete.id);
        setGradientToDelete(null);
        window.requestAnimationFrame(() => sectionRef.current?.focus());
    };

    useEffect(() => {
        if (!gradientToDelete) return undefined;

        const cancelButton = dialogRef.current?.querySelector(
            '[data-safe-action="true"]',
        );
        cancelButton?.focus();

        const handleKeys = (event) => {
            if (event.key === "Escape") {
                closeDialog();
                return;
            }

            if (event.key !== "Tab") return;

            const buttons = dialogRef.current?.querySelectorAll(
                "button:not(:disabled)",
            );
            if (!buttons?.length) return;

            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];

            if (event.shiftKey && document.activeElement === firstButton) {
                event.preventDefault();
                lastButton.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastButton
            ) {
                event.preventDefault();
                firstButton.focus();
            }
        };

        document.addEventListener("keydown", handleKeys);
        return () => document.removeEventListener("keydown", handleKeys);
    }, [gradientToDelete]);

    const openDialog = (gradient, event) => {
        deleteTriggerRef.current = event.currentTarget;
        setGradientToDelete(gradient);
    };

    return (
        <section
            className={styles.savedGradients}
            id="saved-gradients"
            aria-labelledby="saved-title"
            ref={sectionRef}
            tabIndex="-1"
        >
            <div className={styles.sectionHeading}>
                <div>
                    <h2 id="saved-title">Saved gradients</h2>
                    <p>Your color studies stay in this browser.</p>
                </div>
                <span className={styles.savedCount}>
                    {gradients.length} saved
                </span>
            </div>

            {gradients.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyMark} aria-hidden="true">
                        +
                    </div>
                    <h3>No gradients saved yet</h3>
                    <p>
                        Name a blend above and save it to start your collection.
                    </p>
                    <a href="#studio">Go to the editor</a>
                </div>
            ) : (
                <div className={styles.gradientGrid}>
                    {gradients.map((gradient) => (
                        <article
                            className={styles.gradientCard}
                            key={gradient.id}
                        >
                            <div
                                className={styles.gradientSample}
                                style={{ background: getGradientCss(gradient) }}
                                aria-label={gradient.name + " gradient preview"}
                                role="img"
                            >
                                <span>{gradient.type} blend</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeading}>
                                    <div>
                                        <h3>{gradient.name}</h3>
                                        <p>
                                            {gradient.stops.length} colors
                                            {gradient.type === "linear"
                                                ? " · " + gradient.angle + "°"
                                                : " · radial"}
                                        </p>
                                    </div>
                                    <button
                                        className={styles.deleteButton}
                                        type="button"
                                        aria-label={"Delete " + gradient.name}
                                        onClick={(event) =>
                                            openDialog(gradient, event)
                                        }
                                    >
                                        <FiTrash2 aria-hidden="true" />
                                    </button>
                                </div>
                                <div
                                    className={styles.colorList}
                                    aria-label="Gradient colors"
                                >
                                    {gradient.stops.map((stop) => (
                                        <span
                                            key={stop.id}
                                            style={{ background: stop.color }}
                                            title={stop.color}
                                            aria-label={stop.color}
                                        />
                                    ))}
                                </div>
                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.useButton}
                                        type="button"
                                        onClick={() => onLoad(gradient)}
                                    >
                                        Use gradient
                                    </button>
                                    <button
                                        className={styles.copyButton}
                                        type="button"
                                        onClick={() => onCopy(gradient)}
                                    >
                                        <FiCopy aria-hidden="true" />
                                        Copy CSS
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {gradientToDelete && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeDialog();
                    }}
                >
                    <div
                        className={styles.deleteDialog}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        aria-describedby="delete-description"
                        ref={dialogRef}
                    >
                        <div className={styles.dialogMark} aria-hidden="true">
                            <FiTrash2 />
                        </div>
                        <h2 id="delete-title">Delete this gradient?</h2>
                        <p id="delete-description">
                            <strong>{gradientToDelete.name}</strong> will be
                            removed from your saved gradients in this browser.
                        </p>
                        <div className={styles.dialogActions}>
                            <button
                                className={styles.cancelButton}
                                type="button"
                                data-safe-action="true"
                                onClick={closeDialog}
                            >
                                Keep gradient
                            </button>
                            <button
                                className={styles.confirmButton}
                                type="button"
                                onClick={confirmDelete}
                            >
                                Delete gradient
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SavedGradients;
