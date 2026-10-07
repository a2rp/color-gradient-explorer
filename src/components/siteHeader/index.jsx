import { useEffect, useRef, useState } from "react";
import { FiDroplet, FiGithub, FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.inner}>
                <a className={styles.brand} href="#studio" onClick={closeMenu}>
                    <span className={styles.brandMark}>
                        <FiDroplet aria-hidden="true" />
                    </span>
                    <span className={styles.brandName}>Prism</span>
                </a>

                <nav
                    className={
                        menuOpen
                            ? styles.mainNavigationOpen
                            : styles.mainNavigation
                    }
                    aria-label="Main navigation"
                    id="main-navigation"
                >
                    <a href="#studio" onClick={closeMenu}>
                        Studio
                    </a>
                    <a href="#saved-gradients" onClick={closeMenu}>
                        Saved
                    </a>
                    <a href="#guide" onClick={closeMenu}>
                        Guide
                    </a>
                </nav>

                <div className={styles.headerActions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/color-gradient-explorer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-controls="main-navigation"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <FiX aria-hidden="true" />
                        ) : (
                            <FiMenu aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;
