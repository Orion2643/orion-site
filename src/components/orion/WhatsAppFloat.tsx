import { useEffect, useState } from "react";
import { createWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

const WHATSAPP_URL = createWhatsAppUrl(WHATSAPP_MESSAGES.contact);

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2.05 22l5.2-1.52A9.96 9.96 0 0 0 12.04 22C17.53 22 22 17.52 22 12S17.53 2 12.04 2Zm0 18.18a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.9.92-3-.2-.31a8.1 8.1 0 1 1 6.79 3.72Zm4.45-6.07c-.24-.12-1.44-.71-1.66-.79-.23-.08-.39-.12-.56.12-.16.25-.64.79-.78.96-.15.16-.29.18-.53.06-1.44-.72-2.39-1.29-3.34-2.92-.25-.43.25-.4.72-1.34.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.47c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.61.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.15-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setAttention(true);
        setTimeout(() => setAttention(false), 1800);
      }, 12000);
    };
    const onActivity = () => {
      setAttention(false);
      schedule();
    };
    schedule();
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (!coarsePointer) {
      window.addEventListener("mousemove", onActivity, { passive: true });
      window.addEventListener("scroll", onActivity, { passive: true });
      window.addEventListener("keydown", onActivity);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (!coarsePointer) {
        window.removeEventListener("mousemove", onActivity);
        window.removeEventListener("scroll", onActivity);
        window.removeEventListener("keydown", onActivity);
      }
    };
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={`group fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500/15 text-emerald-300 shadow-[0_10px_40px_oklch(0.45_0.15_240/0.5),0_0_0_1px_oklch(0.85_0.15_240/0.15)_inset] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:text-emerald-200 hover:shadow-[0_14px_50px_oklch(0.55_0.2_240/0.7),0_0_0_1px_oklch(0.85_0.2_240/0.3)_inset] sm:h-16 sm:w-16 ${
        attention ? "animate-[wa-attention_1.6s_ease-in-out]" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.2 240 / 0.55), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-[wa-ping_2.6s_ease-out_infinite]"
        style={{ boxShadow: "0 0 0 0 oklch(0.7 0.18 240 / 0.5)" }}
      />
      <WhatsAppIcon className="relative block h-7 w-7 translate-y-0 sm:h-8 sm:w-8" />
    </a>
  );
}
