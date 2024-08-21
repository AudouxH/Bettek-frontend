import Head from "next/head";
import styles from "@/styles/Friends.module.css";
import NavigationBar from "@/components/NavigationBar/NavigationBarComponent";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import useFetchBackendData from "@/hooks/fetchBackendData";
import IUser from "@/interfaces/IUser";
import UserItem from "@/components/userItem/UserItemComponent";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Friends() {
  const { userToken } = useUser();
  const { getAllUsers, getUserFriendsStats } = useFetchBackendData();
  const [users, setUsers] = useState<IUser[] | undefined>(undefined);
  const [friendsStats, setFriendsStats] = useState<IUser[] | undefined>(undefined);

  useEffect(() => {
    const getUsers = async (token: string) => {
        const listUsers = await getAllUsers(token);
        console.log('user list:', listUsers);
        setUsers(listUsers)
    }
    console.log("users:", users);
    (users == null || users == undefined) && userToken != undefined && getUsers(userToken);
  }, [users, userToken, setUsers]);

  useEffect(() => {
    const getFriendsStats = async (token: string) => {
        const stats = await getUserFriendsStats(token);
        console.log('user friends stats:', stats);
        setFriendsStats(stats);
    }
    console.log("users:", users);
    (friendsStats == null || friendsStats == undefined) && userToken != undefined && getFriendsStats(userToken);
  }, [friendsStats, userToken, setFriendsStats]);

  const test = {total_bets: 3, total_won: 2, total_lost: 1, win_ratio: 0.66, average_odds: 3.5, friends: [14]}

  const pieData = {
    labels: ["Wins", "Losses"],
    datasets: [
        {
            data: [
              test?.total_won ?? 0,
              test?.total_lost ?? 0,
            ],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"]
        }
    ]
  };

  return (
    <>
      <Head>
        <title>Home - Bettek</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavigationBar />

        {test != undefined && test != null ? (
            <>
          <p className={styles.titleNewUsers}>Your friends statistics</p>
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <h3>Total Bets:</h3>
                <p>{test.total_bets?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Win Ratio:</h3>
                <p>{(test.win_ratio * 100).toFixed(2)}%</p>
              </div>
              <div className={styles.statItem}>
                <h3>Total Wins:</h3>
                <p>{test.total_won?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Total Losses:</h3>
                <p>{test.total_lost?.toString()}</p>
              </div>
              <div className={styles.statItem}>
                <h3>Average Odd:</h3>
                <p>{test.average_odds?.toString()}</p>
              </div>
            </div>
            {
              test?.total_won != 0 || test?.total_lost != 0 ?
            <div className={styles.chartContainer}>
              <h3>Bets Breakdown</h3>
              <Pie data={pieData} />
            </div> : null
            }
            </>
          ) : null}
        <div className={styles.gamePostContainer}>
          <p className={styles.titleNewUsers}>Find new users</p>
          {users != undefined && users != null && users.length > 0 ?
            users.map((user: IUser) => {
                return (
                    <UserItem user={user} key={user.id.toString()} />
                )
        })
            : <p>No users founded</p>}
        </div>
      </main>
    </>
  );
}
