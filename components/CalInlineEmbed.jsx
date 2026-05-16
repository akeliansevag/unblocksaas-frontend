"use client";

import Cal from "@calcom/embed-react";

export default function CalInlineEmbed() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "unblocksaas/fit-call";

  return (
    <div className="h-[650px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft lg:h-[700px]">
      <Cal
        calLink={calLink}
        config={{
          layout: "month_view",
        }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      />
    </div>
  );
}
