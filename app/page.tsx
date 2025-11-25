import React from 'react';
import { getAllProblems } from '@/lib/problems';
import { Navbar } from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const problems = getAllProblems();

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-orange-500/20 selection:text-orange-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">Dashboard</h1>
          <p className="text-zinc-500">
            Welcome back. Select a problem to start coding.
          </p>
        </div>

        <Dashboard problems={problems} />
      </div>
    </div>
  );
}
