import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `### YC-ready one-liner: the 10-second test
- Be specific: who you serve (ICP), the job you solve, and measurable value
- Avoid buzzwords; use plain language partners can repeat
- Lead with outcome; keep it under 20 words
- Pass the bar: could a non-expert explain it after one read?

\`\`\`text
One-liner formula:
We help [ICP] [do job] by [solution], which [quantified value].
\`\`\`

\`\`\`text
Example:
Before: "AI meeting app"
After: "We help seed-stage SaaS teams turn calls into Jira tasks automatically, cutting follow-up time 60%."
\`\`\`

### 60-second founder video outline
- 0–5s: Who you are + one-liner (look at camera)
- 5–20s: Problem in one sentence; who feels it and how often
- 20–40s: 1–2 click demo that shows the core loop in seconds
- 40–55s: Proof: users, growth, retention, or paid pilots
- 55–60s: Why now + ask (apply to YC; looking for pilots)

\`\`\`text
Script skeleton:
"I'm [name], co-founder of [company]. We [one-liner]. [Problem in one line]. Here's the product: [2 actions, show result]. Today, [metric traction]. Now is the moment because [trend/regulation]. We're looking for [design partners/investors] to scale."
\`\`\`

### Demo: transform idea → application assets
- Start with a raw idea; define ICP and a painful job-to-be-done
- Write the one-liner; sanity-check with a user quote or metric
- Draft the 60s script; record in one take; good audio beats fancy edits
- Close with a concrete ask (pilots, intros, specific ICP)

\`\`\`mermaid
flowchart TD
A["Raw idea"] --> B["Talk to 3-5 target users"] --> C["Write 1-sentence value prop"] --> D["Record 60s video"] --> E["Paste into YC application"]
\`\`\`

\`\`\`python
# Optional: quick one-liner helper
def one_liner(icp, job, solution, value):
    return f"We help {icp} {job} by {solution}, which {value}."
print(one_liner(
    "seed-stage SaaS teams",
    "turn meeting decisions into tracked tasks",
    "auto-syncing to Jira and Slack",
    "cuts follow-up time 60%"
))
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>From Idea to Application: Crafting a Compelling One-Liner and Video</h1>
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