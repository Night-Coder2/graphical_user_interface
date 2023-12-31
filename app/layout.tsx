'use client'
import '@/styles/globals.css'
import React from "react";
import { AnimatePresence } from 'framer-motion';
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}