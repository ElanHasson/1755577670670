import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**60-sec Pitch Script (copy/paste)**
\`\`\`text
We are Flux, an AI co-pilot for finance teams. We close books 5x faster for 50 SMBs by auto-categorizing transactions.
In 8 weeks: MRR $0→$18k, gross margin 82%, D30 logo retention 95%.
Why now: real-time bank APIs + affordable LLMs make automation accurate and cheap.
Team: ex-Stripe infra + CPA; we built risk models for millions of transactions.
Go-to-market: bottom-up; 300 qualified on waitlist; payback <6 months.
Raising $1.5M on a standard post-money SAFE; founders@flux.ai.
\`\`\`
**Investor Slide: what to show**
- One-line: what you do and for whom (ICP)
- Traction: growth A→B, revenue/GMV, retention or NDR
- Why now: tech/regulatory trend unlocking adoption
- Team: 1-line credibility (founder-market fit)
- Contact + raise status (optional)
**Signals that pop on Demo Day**
- Weekly growth 5–7%+ in a core metric
- Retention/cohorts improving; NDR >100% for B2B
- Simple, credible GTM: pilots/LOIs, short sales cycles
- Healthy unit economics: gross margin ≥70%, payback <12 months
- Defensibility: proprietary data, workflow lock-in, integrations
\`\`\`mermaid
flowchart TD
A["Intro: name + one-liner"] --> B["What we do"]
B --> C["For whom (ICP)"]
C --> D["Traction: growth, revenue, retention"]
D --> E["Why now (trend/tech/reg)"]
E --> F["Team credibility"]
F --> G["Next steps: contact/raising"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Demo Day in 60 Seconds: Script, Slide, and Signals</h1>
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