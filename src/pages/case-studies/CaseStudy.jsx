import { Link, useParams } from "react-router-dom";
import { caseStudyBySlug } from ".";

// Resolves /case-studies/:slug to its component. Unknown slug → a small,
// on-brand not-found rather than a blank screen.
const CaseStudy = () => {
  const { slug } = useParams();
  const entry = caseStudyBySlug[slug];

  if (!entry) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-100">Case study not found</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          That link doesn't point to a case study — it may have moved or been renamed.
        </p>
        <Link
          to="/#case-studies"
          className="inline-block mt-6 text-green-600 dark:text-green-400 underline underline-offset-4 hover:opacity-70"
        >
          See all case studies
        </Link>
      </div>
    );
  }

  const { Component } = entry;
  return <Component />;
};

export default CaseStudy;
