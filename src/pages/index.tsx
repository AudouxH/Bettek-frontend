import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import fetchBackendData from "@/hooks/fetchBackendData";
import { useUser } from "@/contexts/userContext";
import IUserStats from "@/interfaces/IUserStats";

export default function Login() {
    const [formUserName, setFormUserName] = useState<string | undefined>(undefined);
    const [formPassWord, setFormPassWord] = useState<string | undefined>(undefined);
    const { localStorageData, localReadingData } = useLocalStorage();
    const { loginUser, getUserData } = fetchBackendData();
    const { userToken, setUserName, setUserToken, setUserID } = useUser();
    const router = useRouter();

    const logUser = async () => {
      if (formUserName != null && formUserName != undefined && formPassWord != null && formPassWord != undefined) {
        const response: any = await loginUser(formUserName, formPassWord);
        const userData: IUserStats = await getUserData(response?.access_token);
        if (response?.access_token != null && response?.access_token != undefined && userData?.id != undefined && userData?.id != null) {
            console.log("user data id:", userData.id);
            setUserName(formUserName);
            setUserID(parseInt(userData.id));
            setUserToken(response.access_token);
            localStorageData("userToken", response.access_token);
            localStorageData("userName", formUserName);
            localStorageData("userID", userData.id);
            router.push("/home");
        }
      }
    }

    useEffect(() => {
      if (userToken == undefined || userToken == null) {
        const localToken = localReadingData("userToken");
        const localName = localReadingData("userName");
        const localID = localReadingData("userID");
        localToken != undefined && localToken != null && setUserToken(localToken);
        localName != undefined && localName != null && setUserName(localName);
        localID != undefined && localID != null && setUserID(parseInt(localID));
      }
    }, [localReadingData]);

    useEffect(() => {
      userToken != undefined && userToken != null && router.push('/home');
    }, [userToken, router]);

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
            placeholder="Password"
            value={formPassWord}
            onChange={(e) => setFormPassWord(e.target.value)}
            className={styles.input}
            required
          />
          <button onClick={logUser} className={styles.button}>
            Login
          </button>
          <button onClick={() => router.push('/register')} className={styles.button}>
            {"Don't have account yet ?"}
          </button>
          {userToken && <p className={styles.success}>User logged in successfully!</p>}
        </div>
      </main>
    </>
  );
}
