import Head from "next/head";
import styles from "@/styles/Profil.module.css";
import NavigationBar from "@/components/NavigationBar/NavigationBarComponent";
import Avvvatars from 'avvvatars-react';
import { useUser } from "@/contexts/userContext";
import BetHistory from "@/components/BetHistory/BetHistoryComponent";
import UserPost from "@/components/UserPost/UserPostComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetchBackendData from "@/hooks/fetchBackendData";
import IUserPost from "@/interfaces/IUserPost";
import IUserBet from "@/interfaces/IUserBet";
import IUserStats from "@/interfaces/IUserStats";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import IUser from "@/interfaces/IUser";
import UserItem from "@/components/userItem/UserItemComponent";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profil() {
  const [profilID, setProfilID] = useState<string>();
  const [profilStats, setProfilStats] = useState<IUserStats | undefined>(undefined);
  const [profilBets, setProfilBets] = useState<IUserBet[] | undefined>(undefined);
  const [profilPosts, setProfilPosts] = useState<IUserPost[] | undefined>(undefined);
  const [profilFriends, setProfilFriends] = useState<IUser[] | undefined>(undefined);
  const { userName, userID, userToken } = useUser();
  const { getProfilData, getUserBets, getUserPost, getUserFriend } = useFetchBackendData();
  const router = useRouter();
  const { user_id } = router.query;

  useEffect(() => {
    console.log("user id inside profil:", user_id);
    if (user_id != null && user_id != undefined) {
      setProfilID(user_id.toString());
    } else if (userID != null && userID != undefined) {
      setProfilID(userID?.toString());
    } else {
      setProfilID("100");
    }
  }, [user_id, userID]);

  useEffect(() => {
    const getProfilDatas = async (user_id: string, token: string) => {
      const stats: IUserStats = await getProfilData(user_id, token);
      const bets: IUserBet[] = await getUserBets(user_id, token);
      const posts: IUserPost[] = await getUserPost(user_id, token);
      const friends: IUser[] = await getUserFriend(user_id, token);
      setProfilStats(stats);
      setProfilBets(bets);
      setProfilPosts(posts);
      setProfilFriends(friends);
    }
    profilID != null && profilID != undefined && userToken != undefined && getProfilDatas(profilID, userToken);
  }, [profilID, userToken]);

  const pieData = {
    labels: ["Wins", "Losses"],
    datasets: [
        {
            data: [
                profilStats?.total_won ?? 0,
                profilStats?.total_lost ?? 0,
            ],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"]
        }
    ]
  };

  return (
    <>
      <Head>
        <title>{userName ?? 'Profil'}</title>
        <meta name="description" content="Profil utilisateur" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavigationBar />
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <Avvvatars value={profilStats?.name ?? 'test'} style="shape" />
            <h1 className={styles.username}>{profilStats?.name ?? 'test'}</h1>
          </div>
          {profilStats != undefined && profilStats != null ? (
            <>
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <h3>Total Bets:</h3>
                <p>{profilStats.total_bets?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Win Ratio:</h3>
                <p>{(profilStats.win_ratio * 100).toFixed(2)}%</p>
              </div>
              <div className={styles.statItem}>
                <h3>Total Wins:</h3>
                <p>{profilStats.total_won?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Total Losses:</h3>
                <p>{profilStats.total_lost?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Average Odd:</h3>
                <p>{profilStats.average_odds?.toString()}</p>
              </div>
            </div>
            {
              profilStats?.total_won != 0 || profilStats?.total_lost != 0 ?
            <div className={styles.chartContainer}>
              <h3>Bets Breakdown</h3>
              <Pie data={pieData} />
            </div> : null
            }
            </>
          ) : null}

          <div className={styles.profilFriends}>
            {profilFriends && profilFriends.length > 0 ? (
              profilFriends.map((user: IUser) => (
                <UserItem user={user} key={user.id}/>
              ))
            ) : (
              <p>No bets found</p>
            )}
          </div>

          <div className={styles.profileBets}>
            {profilBets && profilBets.length > 0 ? (
              profilBets.map((bet: IUserBet) => (
                <BetHistory bet={bet} key={bet.id} />
              ))
            ) : (
              <p>No bets found</p>
            )}
          </div>

          <div className={styles.profilePost}>
            {profilPosts && profilPosts.length > 0 ? (
              profilPosts.map((post: IUserPost) => (
                <UserPost post={post} key={post.id} />
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}