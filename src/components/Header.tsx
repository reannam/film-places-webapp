import * as styles from "../styles/Header.module.css";
import logo from "/src/images/longLogo.png";

export default function Header() {
    return (
        <header>
            <div className={styles.header}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <div className={styles.headerRight}>
                    <a href="/">Home</a>
                    <text className={styles.break}>|</text>
                    <a href="/movies">Movies</a>
                    <text className={styles.break}>|</text>
                    <a href="/contact">Contact</a>
                </div>
            </div>
        </header>
    );
}