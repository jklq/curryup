'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Problem } from '@/lib/types';
import { ArrowRight, Search, CheckCircle2, Trophy, Target, Zap, Filter } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface DashboardProps {
  problems: Problem[];
}

export default function Dashboard({ problems }: DashboardProps) {
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    const solved = new Set<string>();
    problems.forEach(p => {
      if (localStorage.getItem(`curryup-solved-${p.slug}`) === 'true') {
        solved.add(p.slug);
      }
    });
    setSolvedSlugs(solved);
  }, [problems]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    problems.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [problems]);

  const stats = useMemo(() => {
    const total = problems.length;
    const solved = solvedSlugs.size;
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
    return { total, solved, percentage };
  }, [problems, solvedSlugs]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === 'All' || 
                            (selectedStatus === 'Solved' && solvedSlugs.has(p.slug)) ||
                            (selectedStatus === 'Unsolved' && !solvedSlugs.has(p.slug));
      const matchesTag = selectedTag === 'All' || p.tags?.includes(selectedTag);

      return matchesSearch && matchesDifficulty && matchesStatus && matchesTag;
    });
  }, [problems, searchQuery, selectedDifficulty, selectedStatus, selectedTag, solvedSlugs]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border border-slate-200 bg-white p-2 pl-4 shadow-sm">
        <div className="flex flex-1 items-center gap-2">
           <Search className="h-4 w-4 text-slate-400" />
           <input 
             type="text"
             placeholder="Search problems..."
             className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
        
        <div className="flex items-center gap-2 border-t border-slate-100 pt-2 md:border-l md:border-t-0 md:pl-2 md:pt-0">
          <div className="flex items-center gap-2 px-2 text-slate-400">
            <Filter className="h-4 w-4" />
          </div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-8 rounded-lg bg-slate-50 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 focus:outline-none border-transparent focus:border-slate-200 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
          </select>

          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="h-8 rounded-lg bg-slate-50 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 focus:outline-none border-transparent focus:border-slate-200 cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select 
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="h-8 rounded-lg bg-slate-50 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 focus:outline-none border-transparent focus:border-slate-200 cursor-pointer"
          >
            <option value="All">All Topics</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problem List */}
      <div className="grid gap-4">
        {filteredProblems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No problems found</h3>
            <p className="text-slate-500 max-w-sm mt-2">
              We couldn't find any problems matching your current filters. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setSelectedTag('All');
              }}
              className="mt-6 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          filteredProblems.map((problem, index) => {
            const isSolved = solvedSlugs.has(problem.slug);
            return (
              <motion.div
                key={problem.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  href={`/problems/${problem.slug}`}
                  className="group relative flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-orange-200 hover:bg-orange-50/30 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      "flex h-12 w-12 items-center justify-center rounded-xl border transition-colors",
                      problem.difficulty === 'Easy' ? 'border-green-100 bg-green-50 text-green-600 group-hover:bg-green-100' :
                      problem.difficulty === 'Medium' ? 'border-yellow-100 bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100' :
                      'border-red-100 bg-red-50 text-red-600 group-hover:bg-red-100'
                    )}>
                      <span className="text-lg font-bold">{problem.difficulty[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">
                          {problem.title}
                        </h3>
                        {isSolved && (
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Solved
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={clsx(
                          "text-xs font-medium",
                          problem.difficulty === 'Easy' ? 'text-green-600' :
                          problem.difficulty === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        )}>
                          {problem.difficulty}
                        </span>
                        <span className="text-slate-300">•</span>
                        <div className="flex gap-2">
                          {problem.tags?.map(tag => (
                            <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pr-2">
                    <div className="hidden group-hover:flex items-center gap-2 text-sm font-medium text-orange-600 mr-2">
                      {isSolved ? 'Practice Again' : 'Solve Challenge'}
                    </div>
                    <div className="rounded-full p-2 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-all">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
