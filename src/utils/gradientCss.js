export const getGradientCss = (gradient) => {
    const colorStops = [...gradient.stops]
        .sort((first, second) => first.position - second.position)
        .map((stop) => stop.color + " " + stop.position + "%")
        .join(", ");

    if (gradient.type === "radial") {
        return "radial-gradient(ellipse at center, " + colorStops + ")";
    }

    return "linear-gradient(" + gradient.angle + "deg, " + colorStops + ")";
};

export const getGradientRule = (gradient) => {
    return "background: " + getGradientCss(gradient) + ";";
};