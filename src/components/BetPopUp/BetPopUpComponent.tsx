import React, { useEffect, useState } from "react";
import styles from './BetPopUp.module.css';
import { useUser } from "@/contexts/userContext";
import fetchBackendData from "@/hooks/fetchBackendData";

interface BetPopupProps {
    gameId: string;
    onClose: () => void;
}

const BetPopup: React.FC<BetPopupProps> = ({ gameId, onClose }) => {
    const [isHomeBet, setIsHomeBet] = useState<boolean>(true);
    const [homeTeam, setHomeTeam] = useState<string>("Lakers");
    const [awayTeam, setAwayTeam] = useState<string>("Bulls");
    const [homeOdds, setHomeOdds] = useState<number>(2.5);
    const [awayOdds, setAwayOdds] = useState<number>(3.2);
    const { userToken } = useUser();
    const { addUserBet } = fetchBackendData();

    const handleTeamSelect = (isHome: boolean) => {
        setIsHomeBet(isHome);
    };

    const handlePlaceBet = async () => {
        if (userToken == undefined || userToken == null) {
            return;
        }
        const betResult = await addUserBet(gameId, userToken, isHomeBet);
        console.log("betResult:", betResult);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>Place your bet</h2>
                <p className={styles.subtitle}>Select a team to bet on:</p>
                <div className={styles.teams}>
                    <button className={isHomeBet ? styles.activeButton : styles.button} onClick={() => handleTeamSelect(true)}>
                        {homeTeam} (Odds: {homeOdds})
                    </button>
                    <button className={!isHomeBet ? styles.activeButton : styles.button} onClick={() => handleTeamSelect(false)}>
                        {awayTeam} (Odds: {awayOdds})
                    </button>
                </div>
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={handlePlaceBet} className={styles.confirmButton}>Place Bet</button>
                </div>
            </div>
        </div>
    );
};

export default BetPopup;