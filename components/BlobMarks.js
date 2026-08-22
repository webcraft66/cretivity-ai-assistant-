"use client";

// CerevityAI's signature mark: a dark badge holding a simplified
// brain-and-circuit glyph, echoing the logo used in the partnership deck —
// used as the header logo and as the assistant's chat avatar.
export default function BlobMark({ size = 36, className = "" }) {
  const gradId = "cerevityBadge";
  const glowId = "cerevityGlyph";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F1626" />
          <stop offset="100%" stopColor="#1E3A6E" />
        </linearGradient>
        <linearGradient id={glowId} x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B8CFF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" rx="13" fill={`url(#${gradId})`} />
      <rect x="2" y="2" width="44" height="44" rx="13" stroke="#3E5C99" strokeOpacity="0.5" />
