import React from "react";

export interface WordProps {
    displayName: string;
}

export type WordType = string;

export const Word = ({ displayName }: WordProps) => {
    return <span>{displayName}</span>;
};
