import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `- 30-day plan: W1 lock ICP and run 10–20 user calls; W2 ship the smallest working version and instrument one core metric; W3 secure 3–5 design partners and drive 5–7% weekly growth; W4 finalize application, 1-minute video, mock interview, and a clean data pack
- Weekly rhythm: Monday priorities, daily user conversations, ship by Friday, write a short weekly update, cut everything not tied to the core metric
- Metrics that prove it: revenue or active users, early retention/cohorts, time-to-first-value, concise pipeline signals (LOIs, pilots, paid trials)
- Resources to use: YC Startup Library, Paul Graham essays, Startup School, SAFE templates, alumni for mock interviews and customer intros
- Do now: choose one metric, schedule five user calls, draft your one-liner, and list top three ships for this week
\`\`\`mermaid
gantt
dateFormat  YYYY-MM-DD
title 30-Day YC Prep
section Week 1
Define ICP and problem      :a1, 2025-09-01, 5d
User interviews             :a2, 2025-09-01, 5d
section Week 2
Ship MVP and onboard        :b1, 2025-09-08, 5d
Instrument analytics        :b2, 2025-09-08, 3d
section Week 3
Drive traction and refine   :c1, 2025-09-15, 5d
Prep application materials  :c2, 2025-09-15, 5d
section Week 4
Mock interview and video    :d1, 2025-09-22, 3d
Data room and investor updates :d2, 2025-09-22, 5d
\`\`\`
\`\`\`text
One-liner template:
We help [ICP] do [job] by [solution], which [measurable value].

Weekly update snippet:
Core metric: X → Y (+Z%) | Users talked: N | Ships: [A, B] | Learnings: [1, 2] | Next: [3, 4] | Asks: [intros, pilots]
\`\`\``;
  const mermaidRef = useRef(0);
  
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7c3aed',
        lineColor: '#5a67d8',
        secondaryColor: '#764ba2',
        tertiaryColor: '#667eea',
        background: '#1a202c',
        mainBkg: '#2d3748',
        secondBkg: '#4a5568',
        tertiaryBkg: '#718096',
        textColor: '#fff',
        nodeTextColor: '#fff',
      }
    });
    
    // Find and render mermaid diagrams
    const renderDiagrams = async () => {
      const diagrams = document.querySelectorAll('.language-mermaid');
      for (let i = 0; i < diagrams.length; i++) {
        const element = diagrams[i];
        const graphDefinition = element.textContent;
        const id = `mermaid-${mermaidRef.current++}`;
        
        try {
          const { svg } = await mermaid.render(id, graphDefinition);
          element.innerHTML = svg;
          element.classList.remove('language-mermaid');
          element.classList.add('mermaid-rendered');
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };
    
    renderDiagrams();
  }, [markdown]);
  
  return (
    <div className="slide markdown-slide">
      <h1>Action Plan and Resources: Your Next 30 Days</h1>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // Handle inline code
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            // Handle mermaid diagrams
            if (language === 'mermaid') {
              return (
                <pre className="language-mermaid">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
              );
            }
            
            // Handle code blocks with syntax highlighting
            if (language) {
              return (
                <SyntaxHighlighter
                  language={language}
                  style={atomDark}
                  showLineNumbers={true}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            // Default code block without highlighting
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}