import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import GameDetailModal from "./gameDetailModal";
import { useState } from "react";

type Tag = {
    id: number;
    name: string;
    slug: string;
    language: string;
}

export interface GameCardProps {
    name: string
    released: string
    rating: number
    background_image: string
    tags: Tag[]
    id: number
    platforms?: any[]
    released_at?: string
    requirements_en?: {
        minimum?: string
        recommended?: string
    }
    short_screenshots?: any[]
    stores?: any[]
}

export default function GameCard({
    name, 
    released, 
    rating, 
    background_image, 
    tags,
    id,
    platforms,
    released_at,
    requirements_en,
    short_screenshots,
    stores,
}: GameCardProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const game = {
        id,
        name,
        released,
        rating,
        background_image,
        tags,
        platforms,
        released_at,
        requirements_en,
        short_screenshots,
        stores,
    }

    return (
        <>
            <div className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <div className="relative h-48 md:h-56 w-full overflow-hidden">
                    <img
                    src={background_image || "/placeholder.svg"}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-md flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{name}</h3>
                    <span className="text-sm text-gray-400">{released}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-900/30 text-purple-200 border-purple-700 text-xs">
                            {tag.name}
                        </Badge>
                    ))}
                    </div>

                    <button 
                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-md text-white font-medium hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                    See More
                    </button>
                </div>
            </div>

            <GameDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} game={game} />
        </>
    )
}