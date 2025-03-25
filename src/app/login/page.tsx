import Navigation from "@/components/Navigation/Navigation";
import styles from "./page.module.css";
import Login from "@/components/Login/Login";

export default async function Home() {

  return (
    <div className={styles.page}>
      <Navigation />
      <Login/>
    </div>
  );
}