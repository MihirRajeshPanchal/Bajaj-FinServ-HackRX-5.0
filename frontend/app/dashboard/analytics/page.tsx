"use client"
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const videoData = [
  { name: 'Video 1', playTime: 1000, rewinds: 5, avgWatchDuration: 800 },
  { name: 'Video 2', playTime: 1200, rewinds: 3, avgWatchDuration: 1000 },
  { name: 'Video 3', playTime: 800, rewinds: 7, avgWatchDuration: 600 },
];

const quizData = [
  { name: 'Quiz 1', avgScore: 75, completionRate: 90, avgTime: 10 },
  { name: 'Quiz 2', avgScore: 80, completionRate: 85, avgTime: 12 },
  { name: 'Quiz 3', avgScore: 70, completionRate: 95, avgTime: 8 },
];

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'quiz'>('video');

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('video')}
        >
          Video Analytics
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz Analytics
        </button>
      </div>

      {activeTab === 'video' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Video Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={videoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="playTime" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="rewinds" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Quiz Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quizData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgScore" fill="#8884d8" />
              <Bar dataKey="completionRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;