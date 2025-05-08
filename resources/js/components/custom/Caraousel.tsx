import { ProductImage } from '@/types/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CaraouselProps {
    images: ProductImage[];
    alt?: string;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

export default function Caraousel({ images, alt }: CaraouselProps) {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = ((page % images.length) + images.length) % images.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="relative mx-auto w-full max-w-xl overflow-hidden">
            <div className="relative h-100 md:h-120 w-full bg-gray-100">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={page}
                        src={images[imageIndex].image_path}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute h-full w-full object-fit"
                        alt={alt}
                    />
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-4">
                <button onClick={() => paginate(-1)} className="bg-opacity-70 hover:bg-opacity-90 rounded-full bg-white p-2 shadow">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => paginate(1)} className="bg-opacity-70 hover:bg-opacity-90 rounded-full bg-white p-2 shadow">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
