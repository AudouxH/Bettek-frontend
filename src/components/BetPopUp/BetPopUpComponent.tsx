import React, { useEffect, useState } from "react";
import styles from './BetPopUp.module.css';
import { useUser } from "@/contexts/userContext";
import fetchBackendData from "@/hooks/fetchBackendData";
import IGamePost from "@/interfaces/IGamePost";
import useFetchBackendData from "@/hooks/fetchBackendData";

interface BetPopupProps {
    gameId: string;
    onClose: () => void;
}

const BetPopup: React.FC<BetPopupProps> = ({ gameId, onClose }) => {
    const [isHomeBet, setIsHomeBet] = useState<boolean>(true);
    const [gamePost, setGamePost] = useState<IGamePost | undefined>(undefined);
    const { userToken } = useUser();
    const { getGameDatas } = useFetchBackendData();
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
    
    useEffect(() => {
        const getAllPostDatas = async (game_id: string, token: string) => {
          const gameData: IGamePost = await getGameDatas(game_id, token);
          console.log("game data inside user post:", gameData);
          setGamePost(gameData);
        }
        gameId != undefined && gameId != null && userToken != undefined && getAllPostDatas(gameId, userToken);
      }, [gameId]);

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>Place your bet</h2>
                <p className={styles.subtitle}>Select a team to bet on:</p>
                <div className={styles.teams}>
                    <button className={isHomeBet ? styles.activeButton : styles.button} onClick={() => handleTeamSelect(true)}>
                        {gamePost?.home_team} (Odds: {gamePost?.home_odds})
                    </button>
                    <button className={!isHomeBet ? styles.activeButton : styles.button} onClick={() => handleTeamSelect(false)}>
                        {gamePost?.away_team} (Odds: {gamePost?.away_odds})
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