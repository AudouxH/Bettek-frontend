import axios from 'axios';

export default function useFetchBackendData() {
    const isLocalData = false;
    const backendURL = isLocalData ? "http://localhost:8888/" : "https://bettek.prophecy-eip.com/api/";

    // USER PART -----------------------------------------------------------------------------
    
    const registerUser = async (name: string, password: string) => {
        try {
            const response: any = await axios.post(backendURL + 'register', {
                name,
                password
            });
            console.log("register data", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const loginUser = async (name: string, password: string) => {
        try {
            const response: any = await axios.post(backendURL + 'login', {
                name,
                password
            });
            console.log("login data", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserData = async (userToken: string) => {
        try {
            const response: any = await axios.get(backendURL + 'me',
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("user data", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserFriendsStats = async (userToken: string) => {
        try {
            const response: any = await axios.get(backendURL + 'stats/friends',
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("user friends stats data", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const addUserBet = async (game_id: string, userToken: string, is_home_bet: boolean) => {
        try {
            const bets: any = await axios.post(backendURL + 'game/' + game_id + "/bet", {
                game_id,
                is_home_bet
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const addUserPost = async (post: string, game_id: string, userToken: string) => {
        try {
            const bets: any = await axios.post(backendURL + 'post', {
                post,
                game_id
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const addUserFriend = async (friendID: string, userToken: string) => {
        try {
            const bets: any = await axios.post(backendURL + 'friend/' + friendID,
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    // HOME PART -----------------------------------------------------------------------------

    const getPostFeed = async () => {
        try {
            const response: any = await axios.get(backendURL + 'feed');
            console.log("post feed response", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getGamesFeed = async () => {
        try {
            const response: any = await axios.get(backendURL + 'games');
            console.log("game feed response", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllBets = async () => {
        try {
            const bets: any = await axios.get(backendURL + 'bets');
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllGames = async () => {
        try {
            const bets: any = await axios.get(backendURL + 'fetch_games');
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllUsers = async () => {
        try {
            const bets: any = await axios.get(backendURL + 'users');
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const getGameDatas = async (game_id: string) => {
        try {
            const bets: any = await axios.get(backendURL + 'game/' + game_id);
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }

    const getGameResult = async (game_id: string, sport_id: string) => {
        try {
            const bets: any = await axios.get(backendURL + 'result/' + sport_id + '/' + game_id);
            return(bets);
        } catch (error) {
            console.log(error);
        }
    }


    // PROFIL PART -----------------------------------------------------------------------------

    const getProfilData = async (user_id: string) => {
        try {
            const response: any = await axios.get(backendURL + 'user/' + user_id);
            console.log("profil data", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserBets = async (user_id: string) => {
        try {
            const response: any = await axios.get(backendURL + 'user/' + user_id + '/bets');
            console.log("profil bets", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    }

     const getUserPost = async (user_id: string) => {
        try {
            const response: any = await axios.get(backendURL + 'user/' + user_id + '/posts');
            console.log("profil posts", response.data);
            return(response);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        registerUser,
        getPostFeed,
        getGamesFeed,
        getAllBets,
        getUserBets,
        addUserBet,
        addUserPost,
        loginUser,
        getUserData,
        getProfilData,
        getUserPost,
        getUserFriendsStats,
        addUserFriend,
        getAllGames,
        getGameDatas,
        getGameResult,
        getAllUsers
    };
}