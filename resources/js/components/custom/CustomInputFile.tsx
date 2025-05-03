import { cn } from '@/lib/utils';
import { Image, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface PropsType {
    onChange: (data: File[]) => void;
}

export default function CustomInputFile({ onChange }: PropsType) {
    const [files, setFile] = useState<File[]>([]);
    const [previews, setPreview] = useState<{ originalName: string, src: string }[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onChange([...files, ...e.target.files]);
            setFile((prev) => [...prev, ...(e.target.files || [])]);
        }
    };
    
    const handleDelete = (file: {originalName: string, src: string}) => {
      const filteredFiles = files.filter(item => item.name  !== file.originalName);
      setFile(filteredFiles);
      onChange(filteredFiles);
    }

    useEffect(() => {
        const urls = files.map((file) => ({originalName: file.name, src: URL.createObjectURL(file)}));
        setPreview(urls);
    }, [files]);

    return (
        <div>
            <label htmlFor="input" className="text-sm font-medium mb-1">
                Gambar Produk *
            </label>
            <div
                onClick={handleClick}
                className={cn(
                    'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer items-center',
                )}
            >
                <Image className="me-2" />
                Pilih gambar
            </div>
            <input ref={inputRef} type="file" multiple style={{ display: 'none' }} id="input" onChange={handleChange} />
            <div className='flex justify-center'>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-7">
                {previews.map((file, i) => (
                    <div key={i} className="h-32 w-32 overflow-hidden rounded bg-gray-200 shadow relative" onClick={() => handleDelete(file)}>
                        <span className='group block absolute w-full h-full hover:bg-black/50 cursor-pointer'>
                          <Trash className='hidden group-hover:block relative left-[40%] top-[40%]' color='red'/>
                        </span>
                        <img src={file.src} alt={`preview-${i}`} className="h-full w-full object-cover" />
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}
