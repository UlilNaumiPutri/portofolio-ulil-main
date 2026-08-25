import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me | Putri",
  description:
    "Kenali lebih dekat Putri",
};

export default function AboutPage() {
  return <AboutClient />;
}
