export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090b]" />
      <div className="absolute inset-0 bg-grid" />

      <svg
        className="absolute -top-32 left-1/2 h-[720px] w-[1000px] -translate-x-1/2 opacity-70"
        viewBox="0 0 1000 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="45" />
          </filter>
          <radialGradient id="orb1">
            <stop stopColor="#6366F1" stopOpacity=".42" />
            <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb2">
            <stop stopColor="#06B6D4" stopOpacity=".28" />
            <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g filter="url(#blur1)">
          <circle className="animate-float" cx="300" cy="220" r="210" fill="url(#orb1)" />
          <circle className="animate-float-delayed" cx="720" cy="330" r="240" fill="url(#orb2)" />
        </g>
        <path
          d="M-50 470C130 350 220 610 410 480C600 350 700 190 1050 350"
          stroke="#818CF8"
          strokeOpacity=".13"
          strokeWidth="2"
        />
        <path
          d="M-50 520C150 420 250 660 450 520C650 380 790 240 1050 420"
          stroke="#22D3EE"
          strokeOpacity=".08"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
