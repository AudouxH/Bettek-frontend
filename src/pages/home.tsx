import Head from "next/head";
import styles from "@/styles/Home.module.css";
import IUserPost from "@/interfaces/IUserPost";
import UserPost from "@/components/UserPost/UserPostComponent";
import NavigationBar from "@/components/NavigationBar/NavigationBarComponent";
import { useUser } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetchBackendData from "@/hooks/fetchBackendData";

export default function Home() {
  const { userToken } = useUser();
  const { getPostFeed } = useFetchBackendData();
  const router = useRouter();
  const [usersPosts, setUsersPosts] = useState<IUserPost[] | undefined>(undefined)

  useEffect(() => {
    (userToken == null || userToken == undefined) && router.push("/");
  }, [userToken, router]);

  useEffect(() => {
    const getUsersPosts = async (token: string) => {
      const listOfPosts: any = await getPostFeed(token);
      listOfPosts != undefined && listOfPosts != null && setUsersPosts(listOfPosts);
    }
    (usersPosts == null || usersPosts == undefined) && userToken != undefined && getUsersPosts(userToken);
  }, [getPostFeed, usersPosts, userToken]);

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
        <div className={styles.profileContainer}>
            {usersPosts && usersPosts.length > 0 ? (
              usersPosts.map((post: IUserPost) => (
                <UserPost post={post} key={post.id} />
              ))
            ) : (
              <p className={styles.emptyList}>No posts found</p>
            )}
          </div>
      </main>
    </>
  );
}
