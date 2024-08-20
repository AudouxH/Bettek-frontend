import { useRouter } from 'next/router';
import styles from './NavigationBar.module.css';
import React from 'react';
import { useUser } from '@/contexts/userContext';
import useLocalStorage from '@/hooks/useLocalStorage';

const NavigationBar = () => {
    const router = useRouter();
    const { setUserID, setUserName, setUserToken } = useUser();
    const { localDeletingData } = useLocalStorage();

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <h1>Bettek</h1>
            </div>
            <div className={styles.right}>
                <button onClick={() => router.push('/home')}>Home</button>
                <button onClick={() => router.push('/games')}>Games</button>
                <button onClick={() => router.push('/profil')}>Profil</button>
                <button onClick={() => {
                    setUserID(undefined);
                    setUserName(undefined);
                    setUserToken(undefined);
                    localDeletingData("userName");
                    localDeletingData("userToken");
                    localDeletingData("userID");
                }}>Logout</button>
            </div>
        </nav>
    );
};

export default NavigationBar;