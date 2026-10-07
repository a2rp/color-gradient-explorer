import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => {
    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.pageContent}>
                <section id="studio" className={styles.intro}>
                    <div>
                        <p className={styles.label}>Color Gradient Explorer</p>
                        <h1>Color in motion.</h1>
                        <p className={styles.description}>
                            Build, tune, and save gradients for your next design.
                        </p>
                    </div>
                    <div className={styles.previewPlaceholder} aria-hidden="true" />
                </section>
                <section id="saved-gradients" className={styles.placeholderSection}>
                    <h2>Your saved gradients</h2>
                </section>
                <section id="guide" className={styles.placeholderSection}>
                    <h2>Make a gradient your own</h2>
                </section>
            </main>
        </div>
    );
};

export default App;