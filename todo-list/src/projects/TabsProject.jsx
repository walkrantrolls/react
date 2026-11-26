import Tabs from "../components/Tabs.jsx";
import "./TabsProject.css";

const FOUNDATION_TABS = [
  {
    value: "html",
    label: "HTML",
    panel: (
      <div className="tabs-topic">
        <span className="tabs-topic-index">01 / STRUCTURE</span>
        <h3>Start with a clear structure.</h3>
        <p>HTML gives a page its meaning: headings, paragraphs, links, forms, and the relationships between them.</p>
        <code>&lt;main&gt;Your content&lt;/main&gt;</code>
      </div>
    ),
  },
  {
    value: "css",
    label: "CSS",
    panel: (
      <div className="tabs-topic">
        <span className="tabs-topic-index">02 / PRESENTATION</span>
        <h3>Shape the experience.</h3>
        <p>CSS controls how that structure looks and adapts, from spacing and typography to responsive layouts.</p>
        <code>main &#123; display: grid; &#125;</code>
      </div>
    ),
  },
  {
    value: "javascript",
    label: "JavaScript",
    panel: (
      <div className="tabs-topic">
        <span className="tabs-topic-index">03 / BEHAVIOR</span>
        <h3>Make the interface respond.</h3>
        <p>JavaScript connects user actions to state changes, data, and the updates the interface needs to show.</p>
        <code>setActiveTab("javascript")</code>
      </div>
    ),
  },
];

const WORKFLOW_TABS = [
  {
    value: "plan",
    label: "Plan",
    panel: (
      <div className="workflow-panel">
        <span className="workflow-badge">STEP 01</span>
        <div><strong>Define the outcome</strong><p>Agree on the user problem and what success should look like.</p></div>
      </div>
    ),
  },
  {
    value: "build",
    label: "Build",
    panel: (
      <div className="workflow-panel">
        <span className="workflow-badge">STEP 02</span>
        <div><strong>Ship a focused change</strong><p>Work in a small slice so the result is easy to review.</p></div>
      </div>
    ),
  },
  {
    value: "review",
    label: "Review",
    panel: (
      <div className="workflow-panel">
        <span className="workflow-badge">STEP 03</span>
        <div><strong>Learn from the result</strong><p>Check quality, share feedback, and decide what to improve next.</p></div>
      </div>
    ),
  },
];

function TabsExampleCard({ number, title, description, children }) {
  return (
    <section className="tabs-example-card" aria-labelledby={`tabs-card-${number}`}>
      <div className="tabs-example-card-heading">
        <span className="tabs-example-number">{number}</span>
        <div>
          <h3 id={`tabs-card-${number}`}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function TabsProject() {
  return (
    <div className="tabs-project">
      <header className="tabs-project-intro">
        <p className="tabs-project-eyebrow">REUSABLE UI / INTERACTIVE DEMO</p>
        <h1>One pattern.<br /><em>Many panels.</em></h1>
        <p>Tabs keep related content together and show one focused panel at a time. Switch between the examples, then notice how each group remembers its own selection.</p>
      </header>

      <div className="tabs-examples">
        <TabsExampleCard
          number="01"
          title="Web foundations"
          description="A documentation view with HTML selected by default."
        >
          <Tabs items={FOUNDATION_TABS} defaultValue="html" />
        </TabsExampleCard>

        <TabsExampleCard
          number="02"
          title="Team workflow"
          description="A second, independent instance starting on Build."
        >
          <Tabs items={WORKFLOW_TABS} defaultValue="build" />
        </TabsExampleCard>
      </div>

      <aside className="tabs-concept-note" aria-label="How this component works">
        <span className="tabs-concept-icon" aria-hidden="true">↳</span>
        <p><strong>Independent state.</strong> Each Tabs instance owns its active value, so changing one group never changes the other.</p>
      </aside>
    </div>
  );
}
