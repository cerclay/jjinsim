'use client';

import AdContainer from './AdContainer';

export default function AdSidebar() {
  return (
    <div className="sticky top-24 hidden lg:block">
      <AdContainer
        slot="2183729442" 
        format="vertical"
        style={{
          width: '300px',
          height: '600px',
          margin: '0 auto'
        }}
      />
    </div>
  );
} 