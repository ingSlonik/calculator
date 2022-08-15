import React from "react";
import { Text, View, Switch } from "react-bond";
import { colors } from "../colors";

export type ControlsType = {
    alwaysOnTop: boolean,
}

type ControlsProps = {
    controls: ControlsType,
    onChange: (controls: ControlsType) => void,
};

export function Controls({ controls, onChange }: ControlsProps) {
    return <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 12, marginTop: 4 }}>
        <Text style={{ color: colors.textSecondary }}>Window always on top</Text>
        <View style={{ width: 8 }} />
        <Switch
            thumbColor={{ true: colors.orange, false: colors.buttonSecondary }}
            value={controls.alwaysOnTop}
            onValueChange={alwaysOnTop => onChange({ ...controls, alwaysOnTop })}
        />
    </View>;
}
