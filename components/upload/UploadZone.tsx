"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, FileImage, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
    onFilesSelected: (files: File[]) => void;
}

export function UploadZone({ onFilesSelected }: UploadZoneProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
        setError(null);

        if (fileRejections.length > 0) {
            const err = fileRejections[0].errors[0];
            if (err.code === "file-too-large") {
                setError("File is too large. Max size is 10MB.");
            } else if (err.code === "file-invalid-type") {
                setError("Only image files are allowed.");
            } else {
                setError(err.message);
            }
            return;
        }

        if (acceptedFiles.length + files.length > 10) {
            setError("You can upload a maximum of 10 photos.");
            return;
        }

        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);
        onFilesSelected(newFiles);
    }, [files, onFilesSelected]);

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onFilesSelected(newFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
    });

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-colors duration-200 ease-in-out flex flex-col items-center justify-center text-center cursor-pointer min-h-[250px]",
                    isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50 bg-white"
                )}
            >
                <input {...getInputProps()} />
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <UploadCloud className="w-8 h-8 text-blue-600" />
                </div>

                {isDragActive ? (
                    <p className="text-lg font-medium text-blue-700">Drop files here...</p>
                ) : (
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-900">
                            Drag & drop photos here or click to select
                        </p>
                        <p className="text-sm text-gray-500">
                            Supports JPG, PNG, WEBP up to 10MB. Max 10 photos.
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-100">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                        >
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                fill
                                className="object-cover"
                                onLoad={() => URL.revokeObjectURL(file.name)} // Cleanup logic needs proper URL handling, simplified here
                            />
                            <button
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate px-2">
                                {file.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
