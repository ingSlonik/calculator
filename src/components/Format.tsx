import React from "react";
import { Text, View } from "react-bond";

type FormatProps = {
    value: number,
    color: string,
    fontSize: number,
};

export function Format({ value, color, fontSize }: FormatProps) {
    const valueString = value.toLocaleString();
    const len = valueString.length;

    if (len < 7) {
        return <Text style={{ color, fontSize }}>{valueString}</Text>;
    } else if (len < 10) {
        return <Text style={{ color, fontSize: fontSize * 0.8 }}>{valueString}</Text>;
    } else {
        const [float, exp] = value.toExponential(5).split("e");

        return <View style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
            <Text style={{ color, fontSize: fontSize * 0.6 }}>{Number(float).toFixed(5)}</Text>
            <Text style={{ color, fontSize: fontSize * 0.6 }}>·10</Text>
            <Text style={{ color, fontSize: fontSize * 0.3 }}>{Number(exp).toLocaleString()}</Text>
        </View>;
    }
}
