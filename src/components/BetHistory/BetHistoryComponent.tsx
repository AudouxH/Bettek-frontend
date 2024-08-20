import React from "react";
import styles from "./BetHistory.module.css";
import IBet from "@/interfaces/IBet";

interface BetItemProps {
    bet: IBet;
}

const BetHistory: React.FC<BetItemProps> = ({ bet }) => {
    const { game_id, is_home_bet, is_won, odds } = bet;

    return (
        <div className={styles.betItem}>
            <div className={styles.gameId}>Game ID: {game_id}</div>
            <div className={styles.betDetails}>
                <div>Bet Type: {is_home_bet ? "Home" : "Away"}</div>
                <div>Odds: {odds.toFixed(2)}</div>
                <div>
                    Result: {is_won === true ? "Won" : is_won === false ? "Lost" : "Pending"}
                </div>
            </div>
        </div>
    );
};

export default BetHistory;