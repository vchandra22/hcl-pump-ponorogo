interface AboutCardProps {
    total?: number;
    title?: string;
    description?: string;
}
export default function AboutCard({ total, title, description }: AboutCardProps) {
    return (
        <div className="w-full rounded-[20px] border border-slate-200 p-12 shadow-sm">
            <p className="text-[32px] leading-tight font-medium text-[#009961]">{total ?? 99}</p>
            <p className="my-4 text-xl font-medium text-[#F5A544]">{title ?? 'Produk'}</p>
            <p className="text-base leading-relaxed text-[#1E1E1E]">
                {description ??
                    'Cras euismod orci at felis cursus, vel vulputate sapien suscipit, sed vehicula magna at lacus interdum, quis laoreet nulla condimentum, vivamus pretium, tortor at tempus ullamcorper, diam ligula lobortis quam, at scelerisque libero lectus.'}
            </p>
        </div>
    );
}
