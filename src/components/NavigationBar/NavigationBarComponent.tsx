import { useRouter } from 'next/router';
import styles from './NavigationBar.module.css';
import React, { useEffect } from 'react';
import { useUser } from '@/contexts/userContext';
import useLocalStorage from '@/hooks/useLocalStorage';

const NavigationBar = () => {
    const router = useRouter();
    const { setUserID, setUserName, setUserToken, userID } = useUser();
    const { localDeletingData } = useLocalStorage();

    useEffect(() => {
        console.log("user id inside navigation bar:", userID);
    }, [userID]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <h1>Bettek</h1>
            </div>
            <div className={styles.right}>
                <button onClick={() => router.push('/home')}>Home</button>
                <button onClick={() => router.push('/games')}>Games</button>
                <button onClick={() => router.push('/friends')}>friends</button>
                <button onClick={() => router.push(userID != undefined ? ('/profil/' +  userID.toString()) : '')}>Profil</button>
                <button onClick={() => {
                    setUserID(undefined);
                    setUserName(undefined);
                    setUserToken(undefined);
                    localDeletingData("userName");
                    localDeletingData("userToken");
                    localDeletingData("userID");
                    router.push('/');
                }}>Logout</button>
            </div>
        </nav>
    );
};

export default NavigationBar;