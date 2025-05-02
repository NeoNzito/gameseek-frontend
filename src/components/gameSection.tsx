import { useEffect, useMemo, useState } from "react";
import GameCard, { GameCardProps } from "./gameCard";
import { fetchGames, searchGames } from "@/api/games";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import LoadingIcons from "react-loading-icons";

const GamesSection = () => {
    const [games, setGames] = useState<GameCardProps[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const debouncedSearch = useMemo(
        () =>
            debounce(async (q: string) => {
            if (!q.trim()) {
                const data = await fetchGames();
                setGames(data.results);
            } else {
                const data = await searchGames(q);
                setGames(data.results);
            }
            }, 300),
        []
    );

    useEffect(() => {
        fetchGames()
        .then(data => setGames(data.results))
        .finally(() => debouncedSearch.cancel());
    }, [debouncedSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setSearchQuery(q);
        debouncedSearch(q);
    };


    return (
        <section id="games" className="py-12 bg-gray-950">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Featured Games
                </h2>

                <div className="relative mb-8 max-w-md mx-auto md:mx-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    />
                </div>
                {
                    games.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            games.map((game, index) => (
                                <GameCard
                                    key={index}
                                    name={game.name}
                                    released={game.released}
                                    rating={game.rating}
                                    background_image={game.background_image}
                                    tags={game.tags}
                                    id={game.id}
                                    platforms={game.platforms}
                                    released_at={game.released_at}
                                    requirements_en={game.requirements_en}
                                    short_screenshots={game.short_screenshots}
                                    stores={game.stores}
                                />
                            )) 
                        }
                    </div>
                    :
                    <div className="flex flex-col gap-6 w-full text-center items-center">
                        <h1 className="text-2xl font-bold">Loading </h1>
                        <LoadingIcons.ThreeDots />
                    </div>
                }
            </div>
        </section>
    )
}

export default GamesSection;