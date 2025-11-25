'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Problem, RunOutput, LLMResult } from '@/lib/types';
import CodeEditor from '@/components/CodeEditor';
import ProblemView from '@/components/ProblemView';
import { Play, Loader2, CheckCircle2, XCircle, Terminal, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { Navbar } from '@/components/Navbar';

function useDrag(
  isDragging: boolean,
  onMove: (e: MouseEvent) => void,
  onUp: () => void,
  cursor: string
) {
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.body.style.cursor = cursor;
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, onMove, onUp, cursor]);
}

interface ProblemWorkspaceProps {
  problem: Problem;
}

export default function ProblemWorkspace({ problem }: ProblemWorkspaceProps) {
  const [code, setCode] = useState<string>(problem.starterCode || '');
  const [output, setOutput] = useState<RunOutput | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSolved, setIsSolved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state
  useEffect(() => {
    const savedCode = localStorage.getItem(`curryup-code-${problem.slug}`);
    if (savedCode) {
      setCode(savedCode);
    }
    
    const savedSolved = localStorage.getItem(`curryup-solved-${problem.slug}`);
    if (savedSolved === 'true') {
      setIsSolved(true);
    }
    setIsLoaded(true);
  }, [problem.slug]);

  // Save code changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(`curryup-code-${problem.slug}`, code);
    }
  }, [code, problem.slug, isLoaded]);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your code? This cannot be undone.')) {
      setCode(problem.starterCode || '');
      localStorage.removeItem(`curryup-code-${problem.slug}`);
      setStatus('idle');
      setOutput(null);
    }
  };

  // Resizable pane states
  const [leftPaneWidth, setLeftPaneWidth] = useState(50); // percentage
  const [editorHeight, setEditorHeight] = useState(67); // percentage of right pane
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const [isDraggingCorner, setIsDraggingCorner] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Horizontal resize handler (left/right split)
  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingHorizontal(true);
  }, []);

  const handleHorizontalMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingHorizontal || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constraints: min 30%, max 70%
    const clampedWidth = Math.min(Math.max(newWidth, 30), 70);
    setLeftPaneWidth(clampedWidth);
  }, [isDraggingHorizontal]);

  const handleHorizontalMouseUp = useCallback(() => {
    setIsDraggingHorizontal(false);
  }, []);

  // Vertical resize handler (editor/output split)
  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingVertical(true);
  }, []);

  const handleVerticalMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingVertical || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const headerHeight = 56; // 14 * 4 (h-14)
    const availableHeight = containerRect.height - headerHeight;
    const relativeY = e.clientY - containerRect.top - headerHeight;
    const newHeight = (relativeY / availableHeight) * 100;
    
    // Constraints: min 20%, max 80%
    const clampedHeight = Math.min(Math.max(newHeight, 20), 80);
    setEditorHeight(clampedHeight);
  }, [isDraggingVertical]);

  const handleVerticalMouseUp = useCallback(() => {
    setIsDraggingVertical(false);
  }, []);

  // Corner resize handler (both axes simultaneously)
  const handleCornerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingCorner(true);
  }, []);

  const handleCornerMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingCorner || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const headerHeight = 56; // 14 * 4 (h-14)
    
    // Horizontal calculation
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const clampedWidth = Math.min(Math.max(newWidth, 30), 70);
    setLeftPaneWidth(clampedWidth);
    
    // Vertical calculation
    const availableHeight = containerRect.height - headerHeight;
    const relativeY = e.clientY - containerRect.top - headerHeight;
    const newHeight = (relativeY / availableHeight) * 100;
    const clampedHeight = Math.min(Math.max(newHeight, 20), 80);
    setEditorHeight(clampedHeight);
  }, [isDraggingCorner]);

  const handleCornerMouseUp = useCallback(() => {
    setIsDraggingCorner(false);
  }, []);

    // Add/remove event listeners for mouse move and up
  useDrag(isDraggingHorizontal, handleHorizontalMouseMove, handleHorizontalMouseUp, 'col-resize');
  useDrag(isDraggingVertical, handleVerticalMouseMove, handleVerticalMouseUp, 'row-resize');
  useDrag(isDraggingCorner, handleCornerMouseMove, handleCornerMouseUp, 'nwse-resize');


  const handleRun = async () => {
    setIsRunning(true);
    setStatus('idle');
    setOutput(null);

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          testCode: problem.sampleTests,
          llmTests: problem.llmTests,
        }),
      });

      const data = await response.json();
      setOutput(data);

      const combinedOutput = (data.stdout || '') + (data.stderr || '');
      let computedStatus: 'idle' | 'success' | 'error' = 'error';

      // Check for explicit test failures (any non-zero failure count)
      if (combinedOutput.match(/(\d+) failure/i) && !combinedOutput.includes('0 failures')) {
        computedStatus = 'error';
      } 
      // Check for explicit success - Hspec prints "Finished in X seconds" with "0 failures"  
      else if (combinedOutput.includes('Finished in') && combinedOutput.match(/0 failures?/i)) {
        computedStatus = 'success';
      }
      // Check for Haskell compilation or runtime errors (including undefined)
      else if (
        data.error || 
        (data.stderr && (
          data.stderr.includes('Parse error') ||
          data.stderr.includes('parse error') ||
          data.stderr.includes('Not in scope') ||
          data.stderr.includes('Couldn\'t match') ||
          data.stderr.includes('No instance for') ||
          data.stderr.includes('Prelude.undefined') ||
          data.stderr.includes('Exception:')
        ))
      ) {
        computedStatus = 'error';
      }
      // If we have stderr but no clear success/failure indicators, default to error
      else if (data.stderr && data.stderr.trim().length > 0) {
        computedStatus = 'error';
      }
      
      // If LLM tests failed, override status to error
      if (data.llmResults && data.llmResults.some((r: LLMResult) => !r.result?.pass)) {
        computedStatus = 'error';
      }

      setStatus(computedStatus);

      if (computedStatus === 'success') {
        setIsSolved(true);
        localStorage.setItem(`curryup-solved-${problem.slug}`, 'true');
      }

    } catch (error) {
      console.error('Error running code:', error);
      setStatus('error');
      setOutput({ stdout: '', stderr: 'Failed to execute code.' });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div ref={containerRef} className="flex h-screen w-full flex-col bg-white text-slate-700">
      {/* Header */}
      <Navbar 
        title={problem.title}
        rightContent={
          <div className="flex items-center gap-3">
            {isSolved && (
              <div className="flex items-center gap-1.5 text-sm font-medium text-green-600 mr-2">
                <CheckCircle2 className="h-4 w-4" />
                Solved
              </div>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Reset to starter code"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={clsx(
                "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                isRunning 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-green-600 text-white hover:bg-green-500"
              )}
            >
              {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
              Run Code
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Problem Description */}
        <div 
          className="border-r border-slate-200 bg-slate-50"
          style={{ width: `${leftPaneWidth}%` }}
        >
          <ProblemView
            title={problem.title}
            difficulty={problem.difficulty}
            instructions={problem.instructions}
            examples={problem.examples}
          />
        </div>

        {/* Horizontal Drag Handle */}
        <div
          className="group relative w-1 bg-slate-200 cursor-col-resize hover:bg-slate-300 transition-colors"
          onMouseDown={handleHorizontalMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
          
          {/* Corner Handle for bi-directional resizing */}
          <div
            className="absolute w-3 h-3 bg-slate-200 rounded-sm cursor-nwse-resize z-10 border border-slate-300 hover:bg-slate-300 transition-colors"
            style={{ 
              top: `${editorHeight}%`,
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={handleCornerMouseDown}
          />
        </div>

        {/* Right Panel: Editor & Output */}
        <div className="flex flex-col" style={{ width: `${100 - leftPaneWidth}%` }}>
          {/* Editor */}
          <div 
            className="relative"
            style={{ height: `${editorHeight}%` }}
          >
            <CodeEditor value={code} onChange={(val) => setCode(val || '')} />
          </div>

          {/* Vertical Drag Handle */}
          <div
            className="group relative h-1 bg-slate-200 cursor-row-resize hover:bg-slate-300 transition-colors"
            onMouseDown={handleVerticalMouseDown}
          >
            <div className="absolute -top-1 -bottom-1 inset-x-0" />
          </div>

          {/* Output Panel */}
          <div 
            className="bg-white"
            style={{ height: `${100 - editorHeight}%` }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 bg-slate-50">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Terminal className="h-4 w-4" />
                Output
              </div>
              {status === 'success' && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Passed
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <XCircle className="h-3.5 w-3.5" />
                  Failed
                </div>
              )}
            </div>
            <div className="h-full overflow-auto p-4 font-mono text-sm">
              {output ? (
                <>
                  {output.stdout && output.stdout.length > 0 && (
                    <div className="mb-4">
                      <div className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Standard Output</div>
                      <pre className="whitespace-pre-wrap text-slate-800">{output.stdout}</pre>
                    </div>
                  )}
                  {output.stderr && output.stderr.length > 0 && (
                    <div className="mb-4">
                      <div className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Standard Error</div>
                      <pre className={clsx(
                        "whitespace-pre-wrap",
                        status === 'error' ? "text-red-600" : "text-slate-500"
                      )}>{output.stderr}</pre>
                    </div>
                  )}
                  {output.llmResults && output.llmResults.length > 0 && (
                    <div className="mb-4">
                      <div className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Form Validation</div>
                      {output.llmResults.map((llmResult: LLMResult, idx: number) => (
                        <div key={idx} className="mb-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-700">{llmResult.name}</span>
                            {llmResult.result?.pass ? (
                              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Pass
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                                <XCircle className="h-3.5 w-3.5" />
                                Fail
                              </div>
                            )}
                          </div>
                          {llmResult.result?.reason && (
                            <div className="text-sm text-slate-600 mb-1">
                              <span className="text-slate-500">Reason:</span> {llmResult.result.reason}
                            </div>
                          )}
                          {llmResult.result?.evidence && (
                            <div className="text-xs text-slate-500 font-mono">
                              <span className="text-slate-500">Evidence:</span> {llmResult.result.evidence}
                            </div>
                          )}
                          {llmResult.error && (
                            <div className="text-sm text-red-600">
                              Error: {llmResult.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {(output as any).error && (
                    <div className="mb-4">
                      <div className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Error</div>
                      <pre className="whitespace-pre-wrap text-red-600">{(output as any).error}</pre>
                    </div>
                  )}
                  {(!output.stdout || output.stdout.length === 0) && 
                   (!output.stderr || output.stderr.length === 0) && 
                   !(output as any).error && (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No output received
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  Run your code to see output
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
