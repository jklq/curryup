import Link from 'next/link';
import React from 'react';

interface NavbarProps {
  title?: string;
  rightContent?: React.ReactNode;
}

export function Navbar({ title, rightContent }: NavbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 px-4 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-6 w-6 rounded bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-xs">
            λ
          </div>
          <span className="font-semibold text-slate-900">CurryUp</span>
        </Link>
        {title && (
          <>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500">{title}</span>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {rightContent ? rightContent : (
           <div className="flex items-center gap-6">
             <Link 
               href="/" 
               className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
             >
               Problems
             </Link>
             <a 
               href="https://www.haskell.org/documentation/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
             >
               Docs
             </a>
           </div>
        )}
      </div>
    </header>
  );
}
