import React from "react";
import { Text, View } from "react-bond";

import { Format } from "./Format";

import { colors } from "../colors";

type ResultProps = {
    value: string,
};

export function Result({ value }: ResultProps) {
    const number = Number(value);

    return <View style={{
        height: 73,
        paddingRight: 16,
        paddingLeft: 16,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    }}>
        <Format color={colors.textSecondary} fontSize={64} value={number} />
        <Text style={{ color: colors.textSecondary, fontSize: 64 }}>
            {(value.endsWith(".") || value.endsWith(",")) && ","}
        </Text>
    </View>;
}
