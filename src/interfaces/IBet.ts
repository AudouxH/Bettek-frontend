export default interface IBet {
    id: number;
    user_id: number;
    game_id: string;
    is_home_bet: boolean;
    is_won?: boolean | null;
    odds: number;
}