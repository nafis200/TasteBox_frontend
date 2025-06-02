"use client";

import React from "react";
import { DollarSign, Users } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Graph = ({ result }: any) => {
  const totalAmount = result?.totalSum?.[0]?.total || 0;
  const totalEmailCount = result?.totalEmailCount || 0;

  const data = [
    { name: "Amount", value: totalAmount },
    { name: "Users", value: totalEmailCount },
  ];

  const COLORS = ["#4f46e5", "#10b981"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount Sell</p>
              <h2 className="text-2xl font-bold text-blue-600">${totalAmount}</h2>
            </div>
            <DollarSign className="w-10 h-10 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total User Buy</p>
              <h2 className="text-2xl font-bold text-green-600">{totalEmailCount}</h2>
            </div>
            <Users className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>
      </div>

  
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Amount vs Users (Pie Chart)</h2>
          <div className="w-full h-[250px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

     
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Amount vs Users (Bar Chart)</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Graph;
