'use client';

import { QuestionsApi } from "@/api";
import { UserInfo } from "@/types";
import { useState } from "react";

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
    <form onSubmit={submitForm}>
        <input
        type="text"
        name="username"
        placeholder="Enter username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input
        type="password"
        name="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <div>
            <button type="submit">Log in</button>
            <button type="submit">Register</button>
        </div>
    </form>
  );
}