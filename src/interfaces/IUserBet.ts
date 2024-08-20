export default interface IUserBet {
    id: number;
    user_id: number;
    game_id: string;
    is_home_bet: boolean;
    is_won?: boolean;
    odds: number;
}