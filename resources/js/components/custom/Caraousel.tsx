import { AnimatePresence, motion } from 'framer-motion';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CaraouselProps {
    images: string[];
    alt?: string;
}

export default function Caraousel({ images, alt }: CaraouselProps) {
    const [[current, direction], setCurrent] = useState([0, 0]);

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-100%' : '100%',
            opacity: 0
        }),
    };

    const paginate = (newDirection: number) => {
        setCurrent(([prev]) => {
            const nextIndex = (prev + newDirection + images.length) % images.length;
            return [nextIndex, newDirection];
        });
    };

    return (
        <div className="relative sm:h-110 lg:h-120 sm:w-full sm:max-w-120 lg:w-200">
            <div className="absolute flex h-full w-full items-center justify-between px-3">
                <button className="cursor-pointer" onClick={() => paginate(1)}>
                    <CircleChevronLeft size={40} />
                </button>
                <button className="cursor-pointer" onClick={() => paginate(-1)}>
                    <CircleChevronRight size={40} />
                </button>
            </div>

            <div className="h-full w-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={current}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        src={images[current]}
                        custom={direction}
                        variants={variants}
                        transition={{ duration: 0.3 }}
                        className="object-fit h-full w-full object-center"
                        alt={alt}
                        width={100}
                        height={100}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
