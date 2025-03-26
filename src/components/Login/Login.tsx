'use client';

import { QuestionsApi } from "@/api";
import { UserInfo } from "@/types";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // eina leiðin sem ég gat gert þetta
        const action = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        const userInfo: UserInfo = {
            username: username,
            password: password
        }

        const api = new QuestionsApi();

        let response

        if ( action.value === "Login") {
            response = await api.logUserIn(userInfo);
        } else if ( action.value === "Register") {
            response = await api.registerUser(userInfo);
        } else {
            alert("invalid button?");
            return;
        }

        if(typeof response === 'string'){
            alert(response)
            return;
        }

        console.log(response)

        document.cookie = `auth=${response.token}; path=/; Secure; SameSite=Strict`;
        window.location.href = "/";
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
            <button type="submit" value="Login">Log in</button>
            <button type="submit" value="Register">Register</button>
        </div>
    </form>
  );
}