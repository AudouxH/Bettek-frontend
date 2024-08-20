export default interface IUserPost {
    id: number;
    author_id?: number | null;
    post: string;
    game_id?: string | null;
    aftermath: boolean;
}