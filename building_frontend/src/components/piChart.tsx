"use client";

import { Pie, PieChart, Cell } from "recharts"; // Importing Cell from recharts
import {
  Card,
  CardContent,

} from "./ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "chrome", visitors: 275, color: "#FF6384" }, // Different colors
  { browser: "safari", visitors: 200, color: "#36A2EB" },
  { browser: "firefox", visitors: 187, color: "#FFCE56" },
  { browser: "edge", visitors: 173, color: "#4BC0C0" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Dogs",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Hamster",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Memfi",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Blum",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export function Piechart() {
  return (
    <div className="  py-[45px] flex  flex-col  rounded-xl w-[400px] h-[300px] px-[10px] 2xl:px-[70px]">
      <Card className="flex flex-col px-6">
        <div className="flex items-center justify-between">
          <p className=" p-auto">Top 4 Tasks</p>

        </div>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[500px]"
          >
            <PieChart width={300} height={300} className="">
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                fill="#8884d8" // Fallback fill color
                label={false} // Disable labels
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} /> // Using color from chartData
                ))}
              </Pie>
              <ChartLegend
                content={
                  <ChartLegendContent nameKey="browser" data={chartData} />
                }
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
