export type Point = {
    x: number;
    y: number;
    time: number;
};

export type Stroke = Point[];

export type InkData = { x: number[]; y: number[]; time: number[]; }[];

export type RoundData = {
    score: number;        // Score achieved in the round
    canvasData: any;      // This could be a path, image data, or any other representation of the canvas
    // Add any other round-specific data here
    // For example, roundNumber, timeTaken, hintsUsed, etc.
};