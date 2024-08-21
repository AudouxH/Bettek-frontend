import IUser from "./IUser";

export default interface IFriendsStats {
    win_ratio: number;
    total_bets: number;
    average_odds: number;
    total_lost: number;
    total_won: number;
    friends: IUser[];
}