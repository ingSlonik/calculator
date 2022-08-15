import React, { useState } from "react";
import { Window, View, Text } from "react-bond";

import { addHistory } from "./services";

import { Result } from "./components/Result";
import { Button } from "./components/Button";
import { History } from "./components/History";
import { Controls, ControlsType } from "./components/Controls";

import { colors } from "./colors";

export function Calculator() {
    const [controls, setControls] = useState<ControlsType>({ alwaysOnTop: true });
    const [number, setNumber] = useState("0");

    const [operation, setOperation] = useState("");
    const [numberBefore, setNumberBefore] = useState(0);

    // for reload history
    const [resultId, setResultId] = useState("no-result");

    const value = toNumber(number);

    function addNumber(num: number) {
        setNumber(n => toString(toNumber(n + num)));
    }

    function addOperation(operation: string) {
        setNumberBefore(value);
        setOperation(operation);
        setNumber("0");
    }

    async function count() {
        setNumberBefore(value);

        let number = value;
        switch (operation) {
            case "%": number = numberBefore * value / 100; break;
            case "/": number = numberBefore / value; break;
            case "*": number = numberBefore * value; break;
            case "-": number = numberBefore - value; break;
            case "+": number = numberBefore + value; break;
            default: console.error(new Error(`Unknown operator "${operation}".`));
        }

        setNumber(toString(number));

        const id = await addHistory({
            date: new Date().toISOString(),
            valueFrom: numberBefore,
            valueTo: value,
            operation,
            result: number,
        });
        setResultId(id);
    }

    return <Window title="Desktop calculator" width={480} height={360} minSize={{ width: 280, height: 320 }} resizable={true} alwaysOnTop={controls.alwaysOnTop}>
        <View style={{ flexGrow: 1, flexDirection: "row", backgroundColor: colors.background }}>
            <View style={{ minWidth: 192, maxWidth: 252 }}>
                <Result value={number} />

                <View style={{ flexGrow: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly", alignItems: "stretch" }}>
                    <Button color={colors.buttonPrimary} onPress={() => setNumber("0")}>AC</Button>
                    <Button color={colors.buttonPrimary} onPress={() => setNumber(n => String(-Number(n)))}>∓</Button>
                    <Button color={colors.buttonPrimary} onPress={() => addOperation("%")}>%</Button>
                    <Button color={colors.orange} onPress={() => addOperation("/")}>/</Button>

                    <Button onPress={() => addNumber(7)}>7</Button>
                    <Button onPress={() => addNumber(8)}>8</Button>
                    <Button onPress={() => addNumber(9)}>9</Button>
                    <Button color={colors.orange} onPress={() => addOperation("*")}>*</Button>

                    <Button onPress={() => addNumber(4)}>4</Button>
                    <Button onPress={() => addNumber(5)}>5</Button>
                    <Button onPress={() => addNumber(6)}>6</Button>
                    <Button color={colors.orange} onPress={() => addOperation("-")}>-</Button>

                    <Button onPress={() => addNumber(1)}>1</Button>
                    <Button onPress={() => addNumber(2)}>2</Button>
                    <Button onPress={() => addNumber(3)}>3</Button>
                    <Button color={colors.orange} onPress={() => addOperation("+")}>+</Button>

                    <Button long onPress={() => addNumber(0)}>0</Button>
                    <Button onPress={() => setNumber(n => `${n}.`)}>,</Button>
                    <Button color={colors.orange} onPress={() => count()}>=</Button>
                </View>
            </View>
            <View style={{ flexGrow: 1 }}>
                <Controls controls={controls} onChange={setControls} />
                <History key={resultId} onPress={result => setNumber(toString(result.result))} />
            </View>
        </View>
    </Window>;
}

function toString(value: number): string {
    return value.toString();
}

function toNumber(value: string): number {
    return Number(value);
}