import React from 'react';
import { getProblemBySlug } from '@/lib/problems';
import ProblemWorkspace from '@/components/ProblemWorkspace';

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    return <div className="text-white">Problem not found</div>;
  }

  return <ProblemWorkspace problem={problem} />;
}
