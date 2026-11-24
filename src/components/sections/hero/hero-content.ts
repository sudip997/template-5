/**
 * Hero copy. Everything here is fictional placeholder content for the template.
 * Each slide pairs a rotating headline word with the prompt and AI insight shown
 * in the product preview, so the headline and the preview always stay in sync.
 */

export type HeroInsight = {
  title: string;
  body: string;
  sources: readonly string[];
};

export type HeroSlide = {
  word: string;
  prompt: string;
  insight: HeroInsight;
};

export const heroHeadlinePrefix = "Turn scattered data into";

export const heroRotationIntervalMs = 2800;

export const heroSlides: readonly HeroSlide[] = [
  {
    word: "decisions",
    prompt: "Which segment should we focus on next quarter?",
    insight: {
      title: "Prioritize mid-market accounts",
      body: "Renewal intent is strongest in mid-market, and support load there is falling.",
      sources: ["CRM", "Tickets"],
    },
  },
  {
    word: "answers",
    prompt: "Why did trial conversions dip last month?",
    insight: {
      title: "Drop-off happens at step 3",
      body: "Most lapsed trials stalled before connecting their first data source.",
      sources: ["Product usage", "Tickets"],
    },
  },
  {
    word: "workflows",
    prompt: "Alert sales when a key account goes quiet.",
    insight: {
      title: "Workflow drafted in 4 steps",
      body: "Sync CRM activity, score engagement, flag silent accounts, notify the owner.",
      sources: ["CRM", "Slack"],
    },
  },
  {
    word: "insights",
    prompt: "What are customers asking for most?",
    insight: {
      title: "Exports are a recurring request",
      body: "Mentions of bulk export keep appearing across tickets and sales calls.",
      sources: ["Tickets", "Call notes"],
    },
  },
];
