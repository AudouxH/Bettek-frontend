import IGamePost from '@/interfaces/IGamePost';
import styles from './GamePost.module.css';
import React, { useState } from 'react';
import BetPopup from '../BetPopUp/BetPopUpComponent';
import PostPopup from '../PostPopUp/PostPopUpComponent';

interface GameProps {
  game: IGamePost;
}

const GamePost: React.FC<GameProps> = ({ game }) => {
  const { home_team, away_team, starts, home_odds, away_odds, is_done, home_won, home_score, away_score } = game;
  const [isBetPopupOpen, setIsBetPopupOpen] = useState<boolean>(false);
  const [isPostPopupOpen, setIsPostPopupOpen] = useState<boolean>(false);
  const [gameID, setGameID] = useState<string>("");

  return (
    <div className={styles.gamePost}>
      <div className={styles.teamsContainer}>
        <div className={styles.team}>
          <p className={styles.odds}>{home_team}</p>
        </div>
        <div className={styles.vsContainer}>
          <h3 className={styles.versus}>VS</h3>
        </div>
        <div className={styles.team}>
          <p className={styles.odds}>{away_team}</p>
        </div>
      </div>

      <div className={styles.resultContainer}>
        {is_done ? (
          <>
            <p className={styles.result}>{home_score} </p>
            <p className={styles.countdown}>{new Date(starts).toLocaleString()}</p>
            <p className={styles.result}>{away_score}</p>
          </>
        ) : (
          <>
            <p className={styles.result}>{home_odds}</p>
            <p className={styles.countdown}>{new Date(starts).toLocaleString()}</p>
            <p className={styles.result}>{away_odds}</p>
          </>
        )}
      </div>
      <div className={styles.winner}>
        {is_done ? (
          <p>{home_won ? `${home_team} Won` : `${away_team} Won`}</p>
        ) : null}
        </div>

      <div className={styles.buttonsContainer}>
        <button className={`${styles.postButton} ${styles.betButton}`} onClick={() => {
          setGameID(game.game_id);
          setIsBetPopupOpen(true);
        }}>
          <p>Bet</p>
        </button>

        <button className={`${styles.postButton} ${styles.reactButton}`} onClick={() => {
          setGameID(game.game_id);
          setIsPostPopupOpen(true);
        }}>
          <p>React</p>
        </button>
      </div>

      {isBetPopupOpen && (
        <BetPopup gameId={gameID} onClose={() => setIsBetPopupOpen(false)} />
      )}

      {isPostPopupOpen && (
        <PostPopup gameId={gameID} onClose={() => setIsPostPopupOpen(false)} />
      )}
    </div>
  );
};

export default GamePost;