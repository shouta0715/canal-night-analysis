/* eslint-disable react/no-array-index-key */

"use client";

import { formatDate } from "date-fns";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Data = {
  date: string;
  value: number;
};

const chartConfig = {
  date: {
    label: "投稿時間",
  },
  value: {
    label: "投稿数",
    color: "#000",
  },
} satisfies ChartConfig;

type ChartProps = {
  data: Data[][];
};

const timeSortFn = (a: Data, b: Data) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
};

export const Charts = ({ data }: ChartProps) => {
  const chartData = data.map((item) =>
    item.sort(timeSortFn).map(({ date, value }) => ({
      date: formatDate(new Date(date), "HH:mm"),
      value: value.toString(),
    }))
  );

  const totalOne = chartData[0].reduce(
    (acc, curr) => acc + Number(curr.value),
    0
  );
  const totalTwo = chartData[1].reduce(
    (acc, curr) => acc + Number(curr.value),
    0
  );

  return (
    <div className="space-y-20 p-4 md:p-10">
      <div>
        <p className="mb-4 text-center font-bold">
          2024年8月2日 17時 〜 21時30分
        </p>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          投稿数合計：{totalOne}個
        </p>
        <ChartContainer className="min-h-[600px] w-full" config={chartConfig}>
          <LineChart accessibilityLayer data={chartData[0]}>
            <XAxis dataKey="date" />
            <YAxis dataKey="value" domain={[0, 50]} type="number" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <Line dataKey="value" stroke="var(--color-value)" />
            <Line dataKey="date" stroke="var(--color-date)" />
          </LineChart>
        </ChartContainer>
      </div>
      <div>
        <p className="mb-4 text-center font-bold">
          2024年8月3日 17時 〜 21時30分
        </p>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          投稿数合計：{totalTwo}個
        </p>
        <ChartContainer className="min-h-[600px] w-full" config={chartConfig}>
          <LineChart accessibilityLayer data={chartData[1]}>
            <XAxis dataKey="date" />
            <YAxis dataKey="value" domain={[0, 50]} type="number" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <Line dataKey="value" stroke="var(--color-value)" />
            <Line dataKey="date" stroke="var(--color-date)" />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
