export default interface IUserStats {
    id: string;
    name: string;
    user_id: number;
    win_ratio: number;
    total_bets: number;
    average_odds: number;
    total_lost: number;
    total_won: number;
}