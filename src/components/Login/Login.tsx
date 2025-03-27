'use client';

import { QuestionsApi } from "@/api";
import { UserInfo } from "@/types";
import { useState } from "react";
import styles from './Login.module.css'

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        const userInfo: UserInfo = {
            username: username,
            password: password
        }

        const api = new QuestionsApi();
        const response = await api.logUserIn(userInfo);

        if(typeof response === 'string'){
            alert(response)
            return;
        }

        console.log(response)

        document.cookie = `auth=${response.token}; path=/; Secure; SameSite=Strict`;
    }

  return (
    <div className={styles.login}>
        <form onSubmit={submitForm} name="form-login">
            <div className={styles.heading_container}>
                <h1>Log in</h1>
            </div>
            
            <div className={styles.field_container}>
                <input
                className={styles.login_user_inp}
                type="text"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles.field_container}>
                <input
                className={styles.login_pass_inp}
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.button_container}>
                <button type="submit" className={styles.submit_buttons}>Log in</button>
                <button type="submit" className={styles.submit_buttons}>Register</button>
            </div>
        </form>
    </div>
  );
}