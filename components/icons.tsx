type IconProps = {
  className?: string;
};

export function FineIcon({ name, className = "" }: IconProps & { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      {name === "mountain" && (
        <>
          <path {...common} d="M5 34 17 18l7 9 6-7 13 14" />
          <path {...common} d="m17 18 3 8 4-1" />
          <path {...common} d="M8 38h32" />
          <path {...common} d="M37 33V16m0 0-5 7m5-7 5 7m-5 1-4 6m4-6 4 6" />
        </>
      )}
      {name === "horse" && (
        <>
          <path {...common} d="M15 31c1-8 4-14 12-16l6 5-2 6 5 5" />
          <path {...common} d="M23 16 21 8l8 7" />
          <path {...common} d="M16 31c3 4 9 5 15 3" />
          <path {...common} d="M21 24h.1" />
        </>
      )}
      {name === "stable" && (
        <>
          <path {...common} d="M8 39V20l16-10 16 10v19" />
          <path {...common} d="M15 39V25h18v14" />
          <path {...common} d="M24 25v14" />
          <path {...common} d="M18 19h12" />
        </>
      )}
      {name === "balloons" && (
        <>
          <path {...common} d="M18 21c5 0 8-4 8-8s-3-7-8-7-8 3-8 7 3 8 8 8Z" />
          <path {...common} d="M32 25c4 0 7-4 7-8s-3-7-7-7-7 3-7 7 3 8 7 8Z" />
          <path {...common} d="M18 22c-1 8 10 7 6 18" />
          <path {...common} d="M32 26c-3 6 4 7 0 14" />
        </>
      )}
      {name === "sun" && (
        <>
          <circle {...common} cx="24" cy="24" r="8" />
          <path {...common} d="M24 5v6m0 26v6M5 24h6m26 0h6M10.5 10.5l4.2 4.2m18.6 18.6 4.2 4.2m0-27-4.2 4.2M14.7 33.3l-4.2 4.2" />
        </>
      )}
      {name === "scale" && (
        <>
          <path {...common} d="M24 8v30M12 16h24M17 16l-8 14h16l-8-14Zm14 0-8 14h16l-8-14Z" />
          <path {...common} d="M18 40h12" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect {...common} x="9" y="12" width="30" height="28" />
          <path {...common} d="M16 8v8m16-8v8M9 21h30M16 28h2m7 0h2m7 0h2M16 34h2m7 0h2m7 0h2" />
        </>
      )}
      {name === "boot" && (
        <>
          <path {...common} d="M18 7h13l-2 25 8 3c3 1 3 5-1 5H17c-5 0-7-3-6-7l3-10 4-16Z" />
          <path {...common} d="M16 23h13" />
        </>
      )}
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
