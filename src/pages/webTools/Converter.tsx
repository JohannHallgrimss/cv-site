import { useState, useRef, useEffect } from "react";
import type { Translations } from "../../translations";
import { label } from "framer-motion/client";

type Props = {
    t: Translations["webTools"];
};

export const CONVERT_TYPES = [
    {
        id: "Km_Miles",
        label: "Km ↔ Miles",
        forward: (km: number) => km * 0.621371,
        backward: (miles: number) => miles / 0.621371
    },
    {
        id: "Cm_Inches",
        label: "Cm ↔ Inches",
        forward: (cm: number) => cm * 0.393701,
        backward: (inch: number) => inch / 0.393701
    },
    {
        id: "Kg_Pounds",
        label: "Kg ↔ Pounds",
        forward: (kg: number) => kg * 2.20462,
        backward: (lb: number) => lb / 2.20462
    },
    {
        id: "Meters_Feet",
        label: "Meters ↔ Feet",
        forward: (m: number) => m * 3.28084,
        backward: (ft: number) => ft / 3.28084
    },
    {
        id: "Liters_Gallons",
        label: "Liters ↔ Gallons (US)",
        forward: (l: number) => l * 0.264172,
        backward: (gal: number) => gal / 0.264172
    },
    {
        id: "Celsius_Fahrenheit",
        label: "Celsius ↔ Fahrenheit",
        forward: (c: number) => c * 1.8 + 32,
        backward: (f: number) => (f - 32) / 1.8
    },
    {
        id: "Celsius_Kelvin",
        label: "Celsius ↔ Kelvin",
        forward: (c: number) => c + 273.15,
        backward: (k: number) => k - 273.15
    },
    {
        id: "Hours_Minutes",
        label: "Hours ↔ Minutes",
        forward: (h: number) => h * 60,
        backward: (min: number) => min / 60
    },
    {
        id: "Minutes_Seconds",
        label: "Minutes ↔ Seconds",
        forward: (m: number) => m * 60,
        backward: (s: number) => s / 60
    },
    {
        id: "Meters_Kilometers",
        label: "Meters ↔ Kilometers",
        forward: (m: number) => m / 1000,
        backward: (km: number) => km * 1000
    }
];

export default function Converter({ t }: Props) {
    const [value1, setInputValue1] = useState("");
    const [value2, setInputValue2] = useState("");
    const [selectedType, setSelectedType] = useState(CONVERT_TYPES[0]);
    const directionRef = useRef<"left" | "right">("left");

    function convert(from: "left" | "right", input: string, type = selectedType) {
        const num = parseFloat(input);
        if (isNaN(num)) return;

        const result =
            from === "left"
                ? type.forward(num)
                : type.backward(num);

        if (from === "left") {
            setInputValue2(result.toFixed(4));
        } else {
            setInputValue1(result.toFixed(4));
        }
    }

    return (
        <div className="tool-section">
            <h3>{t.converter}</h3>
            <input
                style={{ maxWidth: "200px", marginRight: "12px" }}
                type="text"
                placeholder={t.converterPlaceholder}
                value={value1}
                onChange={(e) => {
                    directionRef.current = "left";
                    setInputValue1(e.target.value);
                    convert("left", e.target.value);
                }}
            />
            <select
                style={{ width: "200px", marginRight: "12px"  }}
                className="dropdown"
                value={selectedType.id}
                onChange={(e) => {
                    const newType =
                        CONVERT_TYPES.find(t => t.id === e.target.value)
                        || CONVERT_TYPES[0];
                    setSelectedType(newType);

                    if (directionRef.current === "left") {
                        convert("left", value1, newType);
                    } else {
                        convert("right", value2, newType);
                    }
                }}
            >
                {CONVERT_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.label}
                    </option>
                ))}
            </select>
            <input
                style={{ maxWidth: "200px"}}
                type="text"
                placeholder= {t.converterPlaceholder}
                value={value2}
                onChange={(e) => {
                    directionRef.current = "right";
                    setInputValue2(e.target.value);
                    convert("right", e.target.value);
                }}
            />
        </div>

    );
}