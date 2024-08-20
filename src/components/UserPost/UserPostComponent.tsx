import IGamePost from '@/interfaces/IGamePost';
import IUserPost from '@/interfaces/IUserPost';
import styles from './UserPost.module.css';
import React from 'react';

interface UserPostProps {
  post: IUserPost;
  game?: IGamePost;
}

const UserPost: React.FC<UserPostProps> = ({ post, game }) => {
  return (
    <div className={styles.userPost}>
    <p className={styles.postUserName}>{post.author_id}</p>
    <p className={styles.postContent}>{post.post}</p>
    {game && (
      <div className={styles.gameInfo}>
        <h4 className={styles.gameTitle}>Game: {game.home_team} vs {game.away_team}</h4>
        {game.is_done ? (
          <p className={styles.finalScore}>Final Score: {game.home_score} - {game.away_score}</p>
        ) : (
          <p className={styles.gameStart}>Starts: {new Date(game.starts).toLocaleString()}</p>
        )}
      </div>
    )}
    {post.aftermath && <p className={styles.aftermath}>Aftermath post</p>}
  </div>
  );
};

export default UserPost;