import IGamePost from '@/interfaces/IGamePost';
import IUserPost from '@/interfaces/IUserPost';
import styles from './UserPost.module.css';
import React, { useEffect, useState } from 'react';
import useFetchBackendData from '@/hooks/fetchBackendData';
import IUserStats from '@/interfaces/IUserStats';
import Avvvatars from 'avvvatars-react';
import { useUser } from '@/contexts/userContext';
import { useRouter } from 'next/router';

interface UserPostProps {
  post: IUserPost;
  game?: IGamePost;
}

const UserPost: React.FC<UserPostProps> = ({ post, game }) => {
  const { getGameDatas, getProfilData } = useFetchBackendData();
  const [userStats, setUserStats] = useState<IUserStats | undefined>(undefined);
  const [gamePost, setGamePost] = useState<IGamePost | undefined>(undefined);
  const { userToken } = useUser();
  const router = useRouter();

  useEffect(() => {
    const getAllPostDatas = async (authorID: number, game_id: string, token: string) => {
      const userData: IUserStats = await getProfilData(authorID.toString(), token);
      const gameData: IGamePost = await getGameDatas(game_id, token);
      setUserStats(userData);
      setGamePost(gameData);
    }
    if (post != undefined && post != null && userToken != undefined) {
      if (post.author_id != null && post.author_id != undefined && post.game_id != null && post.game_id != undefined) {
        getAllPostDatas(post.author_id, post.game_id, userToken);
      }
    }
  }, [post, userToken]);

  return (
<div className={styles.userPost}>
      {userStats && (
        <div className={styles.userInfo}>
          <Avvvatars value={userStats.name ?? 'test'} style="shape" />
          <p onClick={() => router.push("/profil/" + userStats.id)} className={styles.userName}>{userStats.name}</p>
        </div>
      )}
     { gamePost != undefined && 
            <>
            <div className={styles.teamsContainer}>
                <div className={styles.team}>
                    <p className={styles.odds}>{gamePost.home_team}</p>
                </div>
            <div className={styles.vsContainer}>
            <h3 className={styles.versus}>VS</h3>
            </div>
                <div className={styles.team}>
                    <p className={styles.odds}>{gamePost.away_team}</p>
                </div>
            </div>
            <div className={styles.resultContainer}>
            {gamePost.is_done ? (
                <>
                    <p className={styles.result}>{gamePost.home_score} </p>
                    <p className={styles.countdown}>{new Date(gamePost.starts).toLocaleString()}</p>
                    <p className={styles.result}>{gamePost.away_score}</p>
                </>
            ) : (
                <>
                    <p className={styles.result}>{gamePost.home_odds}</p>
                    <p className={styles.countdown}>{new Date(gamePost.starts).toLocaleString()}</p>
                    <p className={styles.result}>{gamePost.away_odds}</p>
                </>
            )}
        </div>
      <div className={styles.winner}>
        {gamePost.is_done ? (
          <p className={styles.winnerText}>{gamePost.home_won ? `${gamePost.home_team} Won` : `${gamePost.away_team} Won`}</p>
        ) : null}
        </div>
            </>}
      <div className={styles.postContent}>
        <p className={styles.sectionTitle}>Post Content</p>
        <p className={styles.contentText}>{post.post}</p>
      </div>
    </div>
  );
};

export default UserPost;