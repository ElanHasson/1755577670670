import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Program**: 3-month accelerator; 2 batches/year; primarily in-person Bay Area with remote-friendly elements; weekly metric focus; culminates in Demo Day to hundreds of investors
- **Deal (2024)**: $500k via two SAFEs — $125k for 7% + $375k uncapped MFN SAFE; YC reserves pro-rata rights; verify latest terms on yc.com
- **Ethos**: Make something people want; talk to users daily; ship weekly; focus hard; be relentlessly resourceful; start narrow (ICP) then expand
- **What wins**: Clarity of problem and user; evidence of velocity and learning; early traction or strong signals (waitlists, pilots, LOIs); simple, direct communication

\`\`\`mermaid
flowchart TD
A["Apply (online form + 1-min video)"] --> B["Interview (~10 min)"]
B --> C["Batch (about 12 weeks)"]
C --> D["Demo Day (1-min pitch)"]
D --> E["Post-batch support & network"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>YC in 120 Seconds: Program, Deal, and Ethos</h1>
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
                <Mermaid chart={String(children).replace(/\n$/, '')} />
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