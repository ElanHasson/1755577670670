import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Operate on a weekly clock**: pick one metric tied to real value (MRR, active teams, retention) and target 5–7% weekly growth; instrument from day one
- **Talk to users daily**: 10–20 conversations/week, tighten your ICP, and do things that do not scale to uncover the must-have use case
- **Ship small, fast, and reliably**: reduce scope, launch weekly, monitor errors; small surface area > sprawling roadmap
- **Ruthless focus**: founders do sales/support; defer hiring, PR, and complex fundraising until the metric moves
- **Write a 1-page weekly update**: metric level + growth, top 3 priorities, key learnings, asks; share in office hours and with mentors
\`\`\`mermaid
flowchart TD
U["Talk to users"] --> I["Extract insights"]
I --> P["Prioritize top 3"]
P --> B["Build smallest version"]
B --> L["Launch to real users"]
L --> M["Measure core metric"]
M --> W["Write weekly update"]
W --> R["Refocus + repeat"]
R --> U
\`\`\`
\`\`\`sql
-- Weekly active accounts (WAA) and WoW growth
WITH events AS (
  SELECT user_id, date_trunc('week', occurred_at) AS wk
  FROM product_events
  WHERE event_name IN ('session_start','task_completed')
  GROUP BY 1,2
),
waa AS (
  SELECT wk, COUNT(DISTINCT user_id) AS waa
  FROM events
  GROUP BY 1
)
SELECT a.wk,
       a.waa,
       ROUND(100.0 * (a.waa - COALESCE(b.waa,0)) / NULLIF(b.waa,0), 1) AS wow_growth_pct
FROM waa a
LEFT JOIN waa b ON b.wk = a.wk - INTERVAL '1 week'
ORDER BY a.wk DESC
LIMIT 8;
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Operating During the Batch: Hitting PMF with Speed and Focus</h1>
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