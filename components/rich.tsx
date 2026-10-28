import { Fragment } from "react";

/**
 * Renders the two pieces of markup the project copy actually uses:
 * `backticks` become <code>, and **double asterisks** become <b>.
 *
 * A markdown parser would be a dependency and an HTML-injection surface for
 * two pieces of syntax. This splits the string and renders the parts as
 * text, so nothing is ever interpreted as HTML.
 */
export function Rich({ children }: { children: string }) {
  // Split on both markers at once, keeping the delimiters.
  const tokens = children.split(/(`[^`]*`|\*\*[^*]*\*\*)/g);

  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith("`") && tok.endsWith("`") && tok.length > 1) {
          return <code key={i}>{tok.slice(1, -1)}</code>;
        }
        if (tok.startsWith("**") && tok.endsWith("**") && tok.length > 3) {
          return <b key={i}>{tok.slice(2, -2)}</b>;
        }
        return <Fragment key={i}>{tok}</Fragment>;
      })}
    </>
  );
}
