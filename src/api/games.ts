import api from "./api";

export const fetchGames = async() => {
    const response = await api.get("/games");
    return response.data;
}

export const fetchGameById = async(gameId: number) => {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
}

export const searchGames = async(query: string) => {
    const response = await api.get("/games/search", {
        params: {
            q: query,
        },
    });
    return response.data;
}