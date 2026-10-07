import { useState } from "react";
import GradientEditor from "./components/gradientEditor/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { startingGradient } from "./data/gradientPresets.js";
import styles from "./App.module.css";

const createStartingGradient = () => ({
    ...startingGradient,
    stops: startingGradient.stops.map((stop) => ({ ...stop })),
});

const App = () => {
    const [gradient, setGradient] = useState(createStartingGradient);
    const [statusMessage, setStatusMessage] = useState("");

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent}>
                <GradientEditor
                    gradient={gradient}
                    onChange={setGradient}
                    onStatus={setStatusMessage}
                />
                <p className={styles.statusMessage} role="status" aria-live="polite">
                    {statusMessage}
                </p>
                <section
                    id="saved-gradients"
                    className={styles.savedPlaceholder}
                    aria-labelledby="saved-title"
                >
                    <h2 id="saved-title">Saved gradients</h2>
                    <p>Save a gradient to keep it in your collection.</p>
                </section>
                <section
                    id="guide"
                    className={styles.guidePlaceholder}
                    aria-labelledby="guide-title"
                >
                    <h2 id="guide-title">Make a blend your own</h2>
                    <p>Choose a color, move a stop, and use the CSS in your project.</p>
                </section>
            </main>
        </div>
    );
};

export default App;