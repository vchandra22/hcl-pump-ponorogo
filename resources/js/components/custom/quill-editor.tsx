import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface QuillEditorProps {
    id: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    className?: string;
    labelClassName?: string;
    height?: string;
    description?: React.ReactNode;
    readOnly?: boolean;
}



const QuillEditor = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    error,
    className,
    labelClassName,
    height = '200px',
    description,
    readOnly = false,
}: QuillEditorProps) => {
    // Gunakan useState untuk memastikan hydration tidak menyebabkan masalah
    const [mounted, setMounted] = useState(false);
    const [editorValue, setEditorValue] = useState(value || '');

    // Konfigurasi modul Quill
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'video'],
            ['clean'],
        ],
    };

    // Format yang diizinkan dalam editor
    const formats = ['header', 'bold', 'video', 'italic', 'underline', 'strike', 'list', 'bullet', 'align', 'link'];

    useEffect(() => {
        // Menandai komponen sudah di-mount
        setMounted(true);
    }, []);

    useEffect(() => {
        // Update editorValue ketika prop value berubah
        setEditorValue(value || '');
    }, [value]);

    const handleChange = (content: string) => {
        setEditorValue(content);
        onChange(content);
    };

    // Jika komponen belum di-mount, tampilkan placeholder atau tidak tampilkan apa-apa
    // untuk menghindari masalah hydration
    if (!mounted) {
        return (
            <div className="space-y-2">
                {label && (
                    <Label htmlFor={id} className={labelClassName}>
                        {label}
                    </Label>
                )}
                <div className={cn('h-min-[200px] rounded-md border px-3 py-2', error && 'border-destructive', className)} style={{ height }}>
                    <div className="h-full w-full bg-gray-50" />
                </div>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
                {error && <InputError message={error} />}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={id} className={labelClassName}>
                    {label}
                </Label>
            )}
            <div className={cn('quill-container', error && 'quill-error', className)}>
                <ReactQuill
                    id={id}
                    theme="snow"
                    value={editorValue}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    style={{ height }}
                    readOnly={readOnly}
                />
            </div>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
            {error && <InputError message={error} />}
        </div>
    );
};

export default QuillEditor;
