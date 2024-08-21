import React, { useEffect, useState } from "react";
import styles from "./BetHistory.module.css";
import IBet from "@/interfaces/IBet";
import useFetchBackendData from "@/hooks/fetchBackendData";
import IGamePost from "@/interfaces/IGamePost";
import GamePost from "../GamePost/GamePostComponent";
import { useUser } from "@/contexts/userContext";

interface BetItemProps {
    bet: IBet;
}

const BetHistory: React.FC<BetItemProps> = ({ bet }) => {
    const { game_id, is_home_bet, is_won, odds } = bet;
    const [gameData, setGameData] = useState<IGamePost>();
    const { getGameDatas } = useFetchBackendData();
    const { userToken } = useUser();

    useEffect(() => {
        const fetchGameData = async (game_id: string, token: string) => {
            const datas: IGamePost = await getGameDatas(game_id, token);
            console.log("datas from game inside bet history", datas);
            setGameData(datas);
        }
        game_id != null && game_id != undefined && userToken != undefined && fetchGameData(game_id, userToken);
    }, [game_id]);

    return (
        <div className={styles.betItem}>
            { gameData != undefined && 
            <>
            <div className={styles.teamsContainer}>
                <div className={styles.team}>
                    <p className={styles.odds}>{gameData.home_team}</p>
                </div>
            <div className={styles.vsContainer}>
            <h3 className={styles.versus}>VS</h3>
            </div>
                <div className={styles.team}>
                    <p className={styles.odds}>{gameData.away_team}</p>
                </div>
            </div>
            <div className={styles.resultContainer}>
            {gameData.is_done ? (
                <>
                    <p className={styles.result}>{gameData.home_score} </p>
                    <p className={styles.countdown}>{new Date(gameData.starts).toLocaleString()}</p>
                    <p className={styles.result}>{gameData.away_score}</p>
                </>
            ) : (
                <>
                    <p className={styles.result}>{gameData.home_odds}</p>
                    <p className={styles.countdown}>{new Date(gameData.starts).toLocaleString()}</p>
                    <p className={styles.result}>{gameData.away_odds}</p>
                </>
            )}
        </div>
      <div className={styles.winner}>
        {gameData.is_done ? (
          <p>{gameData.home_won ? `${gameData.home_team} Won` : `${gameData.away_team} Won`}</p>
        ) : null}
        </div>
            </>}
            <div className={styles.betDetails}>
                {
                    gameData != undefined && <div>Bet on: {is_home_bet ? gameData.home_team : gameData.away_team}</div>
                }
                
                <div>Odds: {odds.toFixed(2)}</div>
                <div className={styles.result}>
                    Result: {is_won === true ? "Won" : is_won === false ? "Lost" : "Pending"}
                </div>
            </div>
        </div>
    );
};

export default BetHistory;