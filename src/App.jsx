import { useState } from "react";
import GradientEditor from "./components/gradientEditor/index.jsx";
import SavedGradients from "./components/savedGradients/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import { startingGradient } from "./data/gradientPresets.js";
import { getGradientRule } from "./utils/gradientCss.js";
import styles from "./App.module.css";

const createStartingGradient = () => ({
    ...startingGradient,
    stops: startingGradient.stops.map((stop) => ({ ...stop })),
});

const readSavedGradients = () => {
    try {
        const saved = localStorage.getItem("prism-saved-gradients");
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const App = () => {
    const [gradient, setGradient] = useState(createStartingGradient);
    const [savedGradients, setSavedGradients] = useState(readSavedGradients);
    const [statusMessage, setStatusMessage] = useState("");

    const saveGradient = () => {
        const savedGradient = {
            ...gradient,
            id: "saved-" + Date.now(),
            name: gradient.name.trim() || "Color study",
            stops: gradient.stops.map((stop) => ({ ...stop })),
        };
        const nextGradients = [savedGradient, ...savedGradients];

        setSavedGradients(nextGradients);
        try {
            localStorage.setItem(
                "prism-saved-gradients",
                JSON.stringify(nextGradients),
            );
            setStatusMessage(savedGradient.name + " was saved.");
        } catch {
            setStatusMessage(
                "Saved for this visit. Browser storage is unavailable.",
            );
        }
    };

    const loadGradient = (savedGradient) => {
        setGradient({
            ...savedGradient,
            stops: savedGradient.stops.map((stop) => ({ ...stop })),
        });
        setStatusMessage(savedGradient.name + " is ready in the editor.");
        document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
    };

    const deleteGradient = (gradientId) => {
        const nextGradients = savedGradients.filter(
            (item) => item.id !== gradientId,
        );
        setSavedGradients(nextGradients);
        try {
            localStorage.setItem(
                "prism-saved-gradients",
                JSON.stringify(nextGradients),
            );
            setStatusMessage("Gradient removed from this browser.");
        } catch {
            setStatusMessage(
                "Gradient removed for this visit. Browser storage is unavailable.",
            );
        }
    };

    const copyGradient = async (gradientToCopy) => {
        try {
            await navigator.clipboard.writeText(getGradientRule(gradientToCopy));
            setStatusMessage("CSS copied to clipboard.");
        } catch {
            setStatusMessage(
                "Clipboard access is unavailable. Copy the CSS from the editor.",
            );
        }
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent}>
                <GradientEditor
                    gradient={gradient}
                    onChange={setGradient}
                    onStatus={setStatusMessage}
                    onSave={saveGradient}
                />
                <p className={styles.statusMessage} role="status" aria-live="polite">
                    {statusMessage}
                </p>
                <SavedGradients
                    gradients={savedGradients}
                    onLoad={loadGradient}
                    onDelete={deleteGradient}
                    onCopy={copyGradient}
                />
                <section
                    id="guide"
                    className={styles.guideSection}
                    aria-labelledby="guide-title"
                >
                    <div className={styles.guideHeading}>
                        <h2 id="guide-title">Three steps to a color you love.</h2>
                        <p>Go from a first impression to a gradient ready for your design.</p>
                    </div>
                    <div className={styles.guideSteps}>
                        <article className={styles.guideStep}>
                            <span className={styles.stepNumber}>01</span>
                            <h3>Choose a starting blend</h3>
                            <p>Pick a preset that is close to the color mood you want.</p>
                        </article>
                        <article className={styles.guideStep}>
                            <span className={styles.stepNumber}>02</span>
                            <h3>Adjust the color stops</h3>
                            <p>Change colors, move each stop, and tune the angle.</p>
                        </article>
                        <article className={styles.guideStep}>
                            <span className={styles.stepNumber}>03</span>
                            <h3>Copy or save your work</h3>
                            <p>Keep a gradient in this browser or copy its CSS rule.</p>
                        </article>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    );
};

export default App;