import styles from './UserItem.module.css';
import React, { useState } from 'react';
import Avvvatars from 'avvvatars-react';
import { useRouter } from 'next/router';
import IUser from '@/interfaces/IUser';
import useFetchBackendData from '@/hooks/fetchBackendData';
import { useUser } from '@/contexts/userContext';

interface UserPostProps {
  user: IUser;
  isAlreadyFriend: boolean;
}

const UserItem: React.FC<UserPostProps> = ({ user, isAlreadyFriend }) => {
  const router = useRouter();
  const { addUserFriend } = useFetchBackendData();
  const { userToken } = useUser();
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddFriend = async () => {
    console.log('user;', user);
    console.log('userTokne:', userToken);
    if (user != undefined && user.id != undefined && userToken != undefined) {
      const newFriend = await addUserFriend(user.id.toString(), userToken);
      setIsAdded(true);
    }
  }

  return (
    <div className={styles.userPost}>
      {user && (
        <div className={styles.userInfo}>
          <Avvvatars value={user.name ?? 'test'} style="shape" />
          <p onClick={() => user != undefined && user.id != undefined && router.push("/profil/" + user.id.toString())} className={styles.userName}>{user.name}</p>
          {
            !isAdded && !isAlreadyFriend? 
              <button onClick={async () => handleAddFriend()} className={styles.addFriend}>add Friend</button> :
              <p className={styles.friendAdded}>friend successfully added</p>
          }
        </div>
      )}
    </div>
  );
};

export default UserItem;