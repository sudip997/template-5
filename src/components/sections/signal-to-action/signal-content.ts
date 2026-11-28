/**
 * "From signal to action" copy. Everything here is fictional placeholder content
 * for the template. One example question runs through all three steps, so edit
 * the steps and the panel data together to keep the story consistent.
 */

export type SignalStepId = "connect" | "ask" | "act";

export type SignalStep = {
  id: SignalStepId;
  title: string;
  description: string;
  panelTitle: string;
};

export const signalHeading = "From signal to action";

export const signalIntro =
  "Follow one question through Nexora, from the tools you already use to a workflow that handles what comes next.";

export const signalSteps: readonly SignalStep[] = [
  {
    id: "connect",
    title: "Connect",
    description: "Link your CRM, support tickets and Slack in a few clicks.",
    panelTitle: "Data sources",
  },
  {
    id: "ask",
    title: "Ask",
    description:
      "Ask a question in plain language and get an answer with its sources.",
    panelTitle: "Ask Nexora",
  },
  {
    id: "act",
    title: "Act",
    description: "Turn the answer into a workflow that runs on its own.",
    panelTitle: "Workflow",
  },
];

export const askExample = {
  question: "Which accounts are going quiet?",
  title: "3 accounts need attention",
  body: "Their activity has fallen over the last 3 weeks.",
  chartLabel: "Weekly activity, last 7 weeks",
  /** Relative values from 0 to 100, oldest week first. */
  activity: [92, 84, 88, 70, 52, 38, 24],
  /** How many of the newest weeks to highlight. */
  highlightedWeeks: 3,
  sources: ["CRM", "Tickets"],
} as const;

export const workflowExample = [
  { kind: "Trigger", label: "Account activity drops" },
  { kind: "Condition", label: "Quiet for 14 days" },
  { kind: "Action", label: "Notify the account owner in Slack" },
] as const;
