"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { stories } from '@/lib/stories';
import { useRouter } from 'next/navigation';

export default function Shell() {
    const shellRef = useRef<SVGSVGElement>(null);
    const [hoveredStory, setHoveredStory] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Breathing animation
        const ctx = gsap.context(() => {
            gsap.to(".shell-scute", {
                scale: 1.02,
                transformOrigin: "center center",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    amount: 1,
                    from: "center"
                }
            });
        }, shellRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (id: string) => {
        setHoveredStory(id);
        gsap.to(`#scute-${id}`, { fill: "#334155", duration: 0.3 }); // Slate 700
    };

    const handleMouseLeave = (id: string) => {
        setHoveredStory(null);
        gsap.to(`#scute-${id}`, { fill: "#1e293b", duration: 0.3 }); // Slate 800
    };

    const handleClick = (slug: string) => {
        router.push(`/stories/${slug}`);
    };

    // Simplified geometric shell: 1 center, 6 surrounding
    return (
        <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
            <svg
                ref={shellRef}
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-2xl"
                style={{ overflow: 'visible' }}
            >
                {/* Glow behind */}
                <circle cx="200" cy="200" r="150" fill="url(#glowGradient)" opacity="0.3" />
                <defs>
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Scute 1: Center */}
                <g
                    id="scute-1"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[0].slug)}
                    onMouseEnter={() => handleMouseEnter('1')}
                    onMouseLeave={() => handleMouseLeave('1')}
                >
                    <path
                        d="M170,150 L230,150 L260,200 L230,250 L170,250 L140,200 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Surrounding Scutes (Approximate Hexagonal positions) */}

                {/* Scute 2: Top */}
                <g
                    id="scute-2"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[1].slug)}
                    onMouseEnter={() => handleMouseEnter('2')}
                    onMouseLeave={() => handleMouseLeave('2')}
                >
                    <path
                        // Extending shapes for a more shell-like tessellation would be complex manually.
                        // Using simpilified polygons for now.
                        d="M165,140 L235,140 L260,80 L140,80 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Scute 3: Top Right */}
                <g
                    id="scute-3"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[2].slug)}
                    onMouseEnter={() => handleMouseEnter('3')}
                    onMouseLeave={() => handleMouseLeave('3')}
                >
                    <path
                        d="M238,148 L265,195 L320,160 L270,100 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Scute 4: Bottom Right */}
                <g
                    id="scute-4"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[3].slug)}
                    onMouseEnter={() => handleMouseEnter('4')}
                    onMouseLeave={() => handleMouseLeave('4')}
                >
                    <path
                        d="M265,205 L238,252 L280,300 L320,240 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Scute 5: Bottom */}
                <g
                    id="scute-5"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[4].slug)}
                    onMouseEnter={() => handleMouseEnter('5')}
                    onMouseLeave={() => handleMouseLeave('5')}
                >
                    <path
                        d="M232,258 L168,258 L140,310 L260,310 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Scute 6: Bottom Left */}
                <g
                    id="scute-6"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[5].slug)}
                    onMouseEnter={() => handleMouseEnter('6')}
                    onMouseLeave={() => handleMouseLeave('6')}
                >
                    <path
                        d="M162,252 L135,205 L80,240 L120,300 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

                {/* Scute 7: Top Left */}
                <g
                    id="scute-7"
                    className="shell-scute cursor-pointer"
                    onClick={() => handleClick(stories[6].slug)}
                    onMouseEnter={() => handleMouseEnter('7')}
                    onMouseLeave={() => handleMouseLeave('7')}
                >
                    <path
                        d="M135,195 L162,148 L130,100 L80,160 Z"
                        fill="#1e293b"
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                </g>

            </svg>

            {/* Hover Preview Overlay */}
            {hoveredStory && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl backdrop-blur-sm max-w-[200px] text-center animate-fade-in shadow-xl">
                        <p className="text-amber-400 text-xs font-medium tracking-widest uppercase mb-1">Story {hoveredStory}</p>
                        <h3 className="text-slate-100 font-serif text-lg leading-tight">
                            {stories.find(s => s.id === hoveredStory)?.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1 justify-center">
                            {stories.find(s => s.id === hoveredStory)?.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-800 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
