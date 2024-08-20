export default interface IGamePost {
    id: number;
    game_id: string;
    sport_id: string;
    starts: string;
    home_team: string;
    away_team: string;
    home_odds: number;
    away_odds: number;
    is_done: boolean;
    home_won?: boolean;
    home_score?: number;
    away_score?: number;
}