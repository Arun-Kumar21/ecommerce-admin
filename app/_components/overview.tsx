'use client'
import React from 'react';

import {LineChart, Line, XAxis, YAxis, ResponsiveContainer} from "recharts";

interface OverviewProps {
  data : any[];
}

const Overview:React.FC<OverviewProps> = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value)=> `$${value}`}
        />

        <Line dataKey="total" fill="#800080"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Overview;