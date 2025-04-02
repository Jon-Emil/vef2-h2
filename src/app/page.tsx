import styles from "./page.module.css";

export default function Home() {
  return (
  <>
  <div className={styles.page}>
    <h1>Welcome to the Movie Archive!!</h1>
    <p>Click genres to see all available genres</p>
    <p>Click movies to see all available movies</p>
    <p>Click log in to log into your account or register for a new account!</p>
    <p>If you are an admin, you can create a new movie to display in the archive</p>
  </div>
  </>
);
}
