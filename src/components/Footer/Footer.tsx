import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <h2>Website Info</h2>
      <div className={styles.Info}>
        <p>Made by:</p>
        <a href="https://github.com/Jon-Emil">Jon-Emil</a>
        <a href="https://github.com/Sigurdur-ari">Sigurdur-ari</a>
        <a href="https://github.com/Dagurvidar">Dagurvidar</a>
        <p>
          This project was made for the Hópverkefni 2 assignment for the
          Vefforritun 2 class in Háskóli Íslands
        </p>
      </div>
    </div>
  );
}
