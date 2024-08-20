import React, { useEffect, useState } from "react";
import styles from './PostPopUp.module.css';
import { useUser } from "@/contexts/userContext";
import fetchBackendData from "@/hooks/fetchBackendData";

interface PostPopupProps {
    gameId: string;
    onClose: () => void;
}

const PostPopup: React.FC<PostPopupProps> = ({ gameId, onClose }) => {
    const { userToken } = useUser();
    const { addUserPost } = fetchBackendData();
    const [postContent, setPostContent] = useState<string>("");

    const handlePlaceBet = async () => {
        if (userToken == undefined || userToken == null) {
            return;
        }
        const betResult = await addUserPost(gameId, postContent, userToken);
        console.log("betResult:", betResult);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2 className={styles.title}>Share a reaction</h2>
                <textarea 
                    className={styles.textarea}
                    value={postContent}
                    onChange={(event) => setPostContent(event.target.value)}
                ></textarea>
                <div className={styles.actions}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={handlePlaceBet} className={styles.confirmButton}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default PostPopup;