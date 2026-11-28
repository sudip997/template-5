/**
 * Features copy. Everything here is fictional placeholder content for the
 * template. Cards 2 to 4 are waiting for their final content and visuals.
 */

import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCreditCard,
  IconMessage,
  IconRoute,
  IconTrendingUp,
} from "@tabler/icons-react";

export type FeatureId = "signals" | "second" | "third" | "fourth";

export type Feature = {
  id: FeatureId;
  title: string;
  description: string;
};

export type LiveSignal = {
  title: string;
  source: string;
  time: string;
  icon: typeof IconRoute;
};

/** Read by screen readers only; the grid itself has no visible heading. */
export const featuresHeading = "Features";

export const features: readonly Feature[] = [
  {
    id: "signals",
    title: "Live signal detection",
    description:
      "Nexora watches your tools and surfaces what changes, as it happens.",
  },
  {
    id: "second",
    title: "Second feature",
    description: "Add a short line describing what this feature does.",
  },
  {
    id: "third",
    title: "Third feature",
    description: "Add a short line describing what this feature does.",
  },
  {
    id: "fourth",
    title: "Fourth feature",
    description: "Add a short line describing what this feature does.",
  },
];

/** Keep at least six, so a row is always out of sight when it loops round. */
export const liveSignals: readonly LiveSignal[] = [
  {
    title: "Account going quiet",
    source: "CRM",
    time: "2m ago",
    icon: IconAlertTriangle,
  },
  {
    title: "Ticket volume spiking",
    source: "Support",
    time: "8m ago",
    icon: IconTrendingUp,
  },
  {
    title: "Renewal intent rising",
    source: "CRM",
    time: "15m ago",
    icon: IconCircleCheck,
  },
  {
    title: "Repeat export requests",
    source: "Slack",
    time: "1h ago",
    icon: IconMessage,
  },
  {
    title: "Trial drop-off detected",
    source: "Product",
    time: "2h ago",
    icon: IconRoute,
  },
  {
    title: "Failed payments rising",
    source: "Billing",
    time: "3h ago",
    icon: IconCreditCard,
  },
];
