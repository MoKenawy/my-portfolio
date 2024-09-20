"use client";


import { NextUIProvider } from "@nextui-org/react";


export default function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full">
                <NextUIProvider>
                    {children}
                </NextUIProvider>
        </div>

    );
}
