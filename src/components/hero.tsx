import { motion } from "framer-motion";

const Hero = () => {
    return(
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
            <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500">
                GameSeek
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
                Discover your next gaming adventure with our curated collection of the best titles across all platforms
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                    transition={{ delay: .6, duration: .5 }}
                >
                    <a href="/#games">
                        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity">
                            Explore Games
                        </button>
                    </a>
                </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero;