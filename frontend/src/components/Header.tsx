import React from "react";
import { ModeToggle } from "./ModeToggle";

export const Header = () => {
    return (
        <header className="w-full container mx-auto flex justify-between px-2 py-3">
            {/* header */}
            <h1 className="text-3xl font-bold">Skill Stake</h1>

            {/* nav */}
            <div className="flex items-center space-x-2">
                <ModeToggle />
            </div>
        </header>
    );
};
