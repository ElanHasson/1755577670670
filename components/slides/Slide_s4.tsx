import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Team**: founder–market fit; technical ownership; even equity; proof of velocity (what shipped last 4 weeks)
- **Problem & wedge**: acute pain, narrow ICP; “why now” tailwinds; small-beachhead → big market
- **Traction & learning speed**: weekly growth 5–7% early; tight build–measure–learn loops; honest pivots
- **Distribution**: concrete GTM (channels, ICP, pipeline); manual onboarding early; credible path to repeatable sales/virality
- **Defensibility & clarity**: data moats, network effects, switching costs; explain what you do in one simple sentence

- Signals that resonate (by model)
- B2B SaaS: MRR growth, NDR >100%, <45-day sales cycles, payback <12 months
- Consumer: improving D1/D7/D30 retention, healthy DAU/MAU, organic % rising
- Marketplaces: GMV up-and-right, repeat transactions, liquidity in first niches
- AI-first: measurable ROI vs baseline, proprietary data, cost-to-serve advantage

\`\`\`mermaid
flowchart TD
A["Team"] --> B["Problem & Wedge"]
B --> C["Traction & Learning Speed"]
C --> D["Distribution Plan"]
D --> E["Defensibility"]
E --> F["Clarity of Story"]
F -->|"Strong signals"| G["Invite / Fund"]
F -->|"Gaps or hand-wavy"| H["Pass / Not Yet"]
C --> E
D --> E
\`\`\`

\`\`\`json
{
  "yc_eval_checklist": {
    "team": {"technical_founder": true, "founder_market_fit": "strong", "velocity_last_4_weeks": "shipped weekly"},
    "traction": {"core_metric": "MRR", "level": 8200, "weekly_growth_%": 6.3, "retention_30d_%": 72},
    "distribution": {"ICP": "seed-stage SaaS teams 10-100", "pipeline": 34, "avg_sales_cycle_days": 28, "payback_months": 8},
    "defensibility": {"data_moat": "workflow data", "integrations": 5, "switching_costs": "medium-high"},
    "clarity": {"one_liner": "We automate X for Y, saving Z time", "why_now": "regulatory change + AI cost drop"}
  }
}
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>What Partners and Investors Actually Look For</h1>
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