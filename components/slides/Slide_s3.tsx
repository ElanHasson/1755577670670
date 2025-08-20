import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **From application to acceptance**: Lead with a crisp one-liner, show velocity (what you shipped, when), real user proof (waitlists, pilots, revenue), and team fit
- **Interview in 10 minutes**: Be concrete and concise; know users, metrics, distribution, and why-now; have a fast live demo ready
- **Inside the batch (≈12 weeks)**: Talk to users daily, ship weekly, focus on a single metric (aim 5–7% weekly when feasible), do things that don’t scale, use the YC network
- **Demo Day and fundraising**: 60-second pitch—what you do, for whom, traction, why now, team; run a tight process with clean post-money SAFEs and consistent updates
- **Beyond the batch**: Keep momentum with alumni support, intros, and disciplined execution; retain your wedge, expand only after repeatable value
\`\`\`mermaid
flowchart TD
A["Application: clear one-liner, velocity, user proof"] --> B["Interview: concise answers, know metrics"]
B --> C["Batch: users daily, ship weekly, one metric"]
C --> D["Demo Day: 60-sec pitch + investor meetings"]
D --> E["Beyond: alumni support, scale with focus"]
\`\`\`
\`\`\`text
1-minute Demo Day template
We are X. We do Y for Z.
Traction: from A to B in T, retention R, revenue $MRR/GMV.
Why now: trend/tech/regulatory change that enables this.
Team: unique insight and ability to win.
Raising: $N on standard post-money SAFE; use of funds and key milestones.
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>The YC Journey: From Application to Demo Day and Beyond</h1>
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