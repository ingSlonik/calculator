import React from "react";
import { Text, View, Pressable } from "react-bond";

import { colors } from "../colors";

type ButtonProps = {
    long?: boolean,
    color?: string,
    onPress: () => void,
    children: string,
};

export function Button({ long = false, color = colors.buttonSecondary, onPress, children }: ButtonProps) {
    return <Pressable
        style={{
            width: long ? "50%" : "25%",
        }}
        onPress={onPress}
    >
        <View style={{
            flexGrow: 1,
            margin: 2,
            borderRadius: 2,
            backgroundColor: color,
            justifyContent: "center",
        }}>
            <Text style={{ textAlign: "center", color: colors.textPrimary, fontSize: 21, fontWeight: "bold" }}>
                {children}
            </Text>
        </View>
    </Pressable>;
}
