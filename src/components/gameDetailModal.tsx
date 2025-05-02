import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react"

interface Platform {
    platform: {
        id: number
        name: string
        slug: string
    }
}

interface Store {
    store: {
        id: number
        name: string
        domain: string
    }
}

interface Screenshot {
    id: number
    image: string
}

type Tag = {
    id: number;
    name: string;
    slug: string;
    language: string;
}

interface GameDetailProps {
    isOpen: boolean
    onClose: () => void
    game: {
        name: string
        released: string
        rating: number
        background_image: string
        tags: Tag[]
        id: number
        platforms?: Platform[]
        released_at?: string
        requirements_en?: {
            minimum?: string
            recommended?: string
        }
        short_screenshots?: Screenshot[]
        stores?: Store[]
    }
}

export default function GameDetailModal({ isOpen, onClose, game }: GameDetailProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = () => {
        if (game.short_screenshots && game.short_screenshots.length > 0) {
        setCurrentImageIndex((prev) => (prev === game.short_screenshots!.length - 1 ? 0 : prev + 1))
        }
    }

    const prevImage = () => {
        if (game.short_screenshots && game.short_screenshots.length > 0) {
        setCurrentImageIndex((prev) => (prev === 0 ? game.short_screenshots!.length - 1 : prev - 1))
        }
    }


    const formatRequirements = (reqString?: string) => {
        if (!reqString) return null

        return reqString
        .replace(/Minimum:|Recommended:/g, "")
        .split(/(?=OS:|Processor:|Memory:|Graphics:|Storage:|Sound Card:)/)
        .filter((item) => item.trim())
        .map((item, index) => (
            <div key={index} className="mb-2">
            <span className="font-semibold">{item.split(":")[0]}:</span>
            <span className="text-gray-300">{item.split(":").slice(1).join(":")}</span>
            </div>
        ))
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-800">
                <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{game.name}</DialogTitle>
                </DialogHeader>

                {/* Main content */}
                <div className="grid gap-6">
                {/* Screenshots carousel */}
                {game.short_screenshots && game.short_screenshots.length > 0 ? (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <img
                        src={game.short_screenshots[currentImageIndex]?.image || game.background_image}
                        alt={`${game.name} screenshot`}
                        className="absolute inset-0 w-full h-full object-contain"
                    />

                    {/* Carousel controls */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">
                        {currentImageIndex + 1} / {game.short_screenshots.length}
                    </div>
                    </div>
                ) : (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-900/50 px-3 py-1 rounded-full flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{game.rating.toFixed(1)}</span>
                        </div>
                        <div className="text-gray-400">{game.released_at || `Released: ${game.released}`}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {game.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-900/30 text-purple-200 border-purple-700">
                            {tag.name}
                        </Badge>
                        ))}
                    </div>

                    {game.platforms && game.platforms.length > 0 && (
                        <div>
                        <h3 className="text-lg font-semibold mb-2">Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                            {game.platforms.map((item, index) => (
                            <Badge key={index} variant="outline" className="bg-purple-900/30 text-purple-200 border-purple-700 text-xs">
                                {item.platform.name}
                            </Badge>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Available at</h3>
                    {game.stores && game.stores.length > 0 ? (
                        <div className="space-y-2">
                        {game.stores.map((item, index) => (
                            <a
                            key={index}
                            href={`https://${item.store.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                            >
                            {item.store.name}
                            <ExternalLink className="h-4 w-4 ml-auto" />
                            </a>
                        ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No store information available</p>
                    )}
                    </div>
                </div>

                {game.requirements_en && (
                    <div className="mt-4">
                    <Tabs defaultValue="minimum" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="minimum">Minimum Requirements</TabsTrigger>
                        <TabsTrigger value="recommended">Recommended Requirements</TabsTrigger>
                        </TabsList>
                        <TabsContent value="minimum" className="p-4 bg-gray-800 rounded-md mt-2">
                        {formatRequirements(game.requirements_en.minimum) || (
                            <p className="text-gray-400">No minimum requirements specified</p>
                        )}
                        </TabsContent>
                        <TabsContent value="recommended" className="p-4 bg-gray-800 rounded-md mt-2">
                        {formatRequirements(game.requirements_en.recommended) || (
                            <p className="text-gray-400">No recommended requirements specified</p>
                        )}
                        </TabsContent>
                    </Tabs>
                    </div>
                )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
