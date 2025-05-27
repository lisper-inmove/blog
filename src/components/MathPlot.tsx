"use client";
import functionPlot from "function-plot";
import { useEffect, useRef } from "react";

interface MathPlotProps {
    expression: string;
    parameters?: string;
}

const regex = /(\w+)=([\d.-]+)/g;

export default function MathPlot({ expression, parameters }: MathPlotProps) {
    const plotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!plotRef.current) return;
        // 替换参数 b、a 等
        const scope: Record<string, number> = {};
        let match;
        while ((match = regex.exec(parameters)) !== null) {
            const key = match[1];
            const value = parseFloat(match[2]);
            scope[key] = value;
        }

        const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        plotRef.current.innerHTML = "";

        functionPlot({
            title: expression,
            target: plotRef.current,
            width: 800,
            height: 400,
            grid: true,
            xAxis: {
                domain: [0, 5],
            },
            yAxis: {
                domain: [-2, 2],
            },
            data: [
                {
                    fn: expression,
                    graphType: "polyline",
                    color: isDark ? "#4FC3F7" : "blue",
                },
            ],
        });

        const svg = plotRef.current.querySelector("svg");

        if (svg) {
            const gridLines = svg.querySelectorAll(".tick line, .domain");
            gridLines.forEach((line: any) => {
                line.setAttribute("stroke", isDark ? "#666" : "#ccc");
            });

            const labels = svg.querySelectorAll(".tick text");
            labels.forEach((text: any) => {
                text.setAttribute("fill", isDark ? "green" : "green");
            });
        }
    }, [expression, parameters]);

    return (
        <div className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white text-green shadow-md dark:bg-gray-900">
            <div ref={plotRef} />
        </div>
    );
}
