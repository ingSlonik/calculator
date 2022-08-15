import React, { useEffect, useState } from "react";
import { Text, ScrollView, Pressable, View } from "react-bond";
import moment from "moment";

import { getHistory, ResultType } from "../services";
import { colors } from "../colors";

import { Format } from "./Format";

type HistoryProps = {
    onPress: (result: ResultType) => void,
};

export function History({ onPress }: HistoryProps) {
    const [results, setResults] = useState<ResultType[]>([]);

    useEffect(() => {
        getHistory().then(setResults);
    }, []);

    return <ScrollView style={{ marginTop: 8 }}>
        {results.map(result => <Pressable
            key={result.date}
            style={{ alignItems: "flex-end", marginTop: 4, marginRight: 12 }}
            onPress={() => onPress(result)}
        >
            <Text style={{ color: colors.textSecondary, fontSize: 10 }}>{moment(result.date).format("YYYY-MM-DD HH:mm:ss")}</Text>
            <View style={{ flexDirection: "row" }}>
                <Format color={colors.textSecondary} fontSize={16} value={result.result} />
                <View style={{ width: 8 }} />
                <Text style={{ color: colors.textSecondary, fontSize: 16 }}>{result.operation}</Text>
                <View style={{ width: 8 }} />
                <Format color={colors.textSecondary} fontSize={16} value={result.result} />
            </View>
            <Format color={colors.textPrimary} fontSize={21} value={result.result} />
        </Pressable>)}
    </ScrollView>;
}
