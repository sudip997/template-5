/**
 * Navbar copy. Everything here is fictional placeholder content for the template.
 * Each `href` points at a section id on the landing page.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const brandName = "Nexora";

export const navLinks: readonly NavLink[] = [
  { label: "Workflow", href: "#workflow" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const signInLink: NavLink = { label: "Sign in", href: "#sign-in" };

export const primaryCta: NavLink = {
  label: "Start free trial",
  href: "#pricing",
};
