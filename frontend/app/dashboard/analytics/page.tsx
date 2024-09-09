"use client"
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Mock data - replace with actual API calls
const videoData = [
  { name: 'Video 1', playTime: 1000, rewinds: 5, avgWatchDuration: 800 },
  { name: 'Video 2', playTime: 1200, rewinds: 3, avgWatchDuration: 1000 },
  { name: 'Video 3', playTime: 800, rewinds: 7, avgWatchDuration: 600 },
];

const quizData = [
  { name: 'Quiz 1', avgScore: 4, correctAnswers: 8, incorrectAnswers: 2, completionRate: 90, avgTime: 10 },
  { name: 'Quiz 2', avgScore: 7, correctAnswers: 7, incorrectAnswers: 3, completionRate: 85, avgTime: 12 },
  { name: 'Quiz 3', avgScore: 6, correctAnswers: 6, incorrectAnswers: 4, completionRate: 95, avgTime: 8 },
];

const topicPerformance = [
  { topic: 'Investment', avgScore: 8, completionRate: 85 },
  { topic: 'Retirement', avgScore: 7, completionRate: 90 },
  { topic: 'Taxes', avgScore: 5, completionRate: 80 },
  { topic: 'Insurance', avgScore: 9, completionRate: 92 },
];

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'quiz'>('video');

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
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
              <Line yAxisId="left" type="monotone" dataKey="playTime" stroke="#16C0F3" />
              <Line yAxisId="right" type="monotone" dataKey="rewinds" stroke="#993ef5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Quiz Performance</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Overall Quiz Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgScore" fill="#16C0F3" />
                  <Bar dataKey="completionRate" fill="#993ef5" />
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-2">
                The overall quiz analytics show that users are performing well, with average scores ranging from 4 to 7 out of 10. The completion rates are also high, indicating that users are engaged with the quiz content.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Topic-wise Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={topicPerformance} dataKey="avgScore" nameKey="topic" cx="50%" cy="50%" outerRadius={80}>
                    {topicPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#16C0F3' : '#993ef5'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="mt-2">
                The topic-wise performance chart reveals that users are performing best on the Insurance and Investment topics, with average scores of 9 and 8 out of 10, respectively. The Taxes topic seems to be the most challenging, with an average score of 5 out of 10. This suggests that the content or teaching methods for the Taxes topic may need to be revisited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;