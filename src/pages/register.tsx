import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import fetchBackendData from "@/hooks/fetchBackendData";
import { useUser } from "@/contexts/userContext";

export default function Register() {
    const [formUserName, setFormUserName] = useState<string | undefined>(undefined);
    const [formPassWord1, setFormPassWord1] = useState<string | undefined>(undefined);
    const [formPassWord2, setFormPassWord2] = useState<string | undefined>(undefined);
    const { localStorageData } = useLocalStorage();
    const { registerUser } = fetchBackendData();
    const { userName, setUserName, userID, setUserID } = useUser();
    const router = useRouter();

    const handleUserClick = async () => {
        if (formUserName == null || formUserName == undefined) return;
        if (formPassWord1 == null || formPassWord1 == undefined) return;
        if (formPassWord2 == null || formPassWord2 == undefined) return;
        if (formPassWord1 != formPassWord2) return;
        
        try {
            const response: any = await registerUser(formUserName, formPassWord1);
            console.log("res from registration:", response);
            if (response != null && response != undefined && response.name != null && response.id != null) {
                setUserName(response.name);
                setUserID(response.id);
                localStorageData("userID", response.id.toString());
                localStorageData("userName", response.name);
            }
        } catch (error) {
            console.log("error from register event:", error);
        }
      }

    return (
    <>
      <Head>
        <title>Login - Bettek</title>
        <meta name="description" content="Login to our app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.header}>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={formUserName}
            onChange={(e) => setFormUserName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Username"
            value={formPassWord1}
            onChange={(e) => setFormPassWord1(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Username"
            value={formPassWord2}
            onChange={(e) => setFormPassWord2(e.target.value)}
            className={styles.input}
            required
          />
          
          {userName && userID ? <>
          <p className={styles.success}>User created successfully! please log in</p>
          <button onClick={() => router.push('/')} className={styles.button}>
            Login
          </button>
          </> :
          <button onClick={handleUserClick} className={styles.button}>
          Register
          </button>
          }
        </div>
      </main>
    </>
  );
}
