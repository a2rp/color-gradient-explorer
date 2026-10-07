export const startingGradient = {
    name: "Digital dawn",
    type: "linear",
    angle: 132,
    stops: [
        { id: "dawn-one", color: "#F88B73", position: 0 },
        { id: "dawn-two", color: "#8D6FCE", position: 52 },
        { id: "dawn-three", color: "#B4E7D3", position: 100 },
    ],
};

export const gradientPresets = [
    {
        id: "soft-focus",
        name: "Soft focus",
        type: "linear",
        angle: 138,
        stops: [
            { id: "soft-one", color: "#F4B6C5", position: 0 },
            { id: "soft-two", color: "#BDB8EF", position: 100 },
        ],
    },
    {
        id: "mint-study",
        name: "Mint study",
        type: "linear",
        angle: 115,
        stops: [
            { id: "mint-one", color: "#AEE3CF", position: 0 },
            { id: "mint-two", color: "#E9EDB9", position: 100 },
        ],
    },
    {
        id: "citrus-dusk",
        name: "Citrus dusk",
        type: "linear",
        angle: 125,
        stops: [
            { id: "citrus-one", color: "#F7B84B", position: 0 },
            { id: "citrus-two", color: "#F27666", position: 50 },
            { id: "citrus-three", color: "#42347F", position: 100 },
        ],
    },
    {
        id: "violet-hour",
        name: "Violet hour",
        type: "radial",
        angle: 0,
        stops: [
            { id: "violet-one", color: "#42347F", position: 0 },
            { id: "violet-two", color: "#BA8DF3", position: 58 },
            { id: "violet-three", color: "#F6C491", position: 100 },
        ],
    },
];