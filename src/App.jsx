import styles from "./App.module.css";

const App = () => {
    return (
        <div className={styles.appShell}>
            <main className={styles.pageContent}>
                <p className={styles.label}>Color Gradient Explorer</p>
                <h1>Color in motion.</h1>
                <p className={styles.description}>
                    Build, tune, and save gradients for your next design.
                </p>
            </main>
        </div>
    );
};

export default App;
