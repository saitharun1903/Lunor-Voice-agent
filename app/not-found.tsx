import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VoiceOpsSymbol } from "@/components/ui/lunor-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07090e] text-zinc-950 dark:text-white flex flex-col items-center justify-center p-6 text-center select-none transition-colors">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center justify-center gap-2">
          <VoiceOpsSymbol size={28} />
          <span className="font-sans font-bold text-lg tracking-tight uppercase">
            VOICEOPS
          </span>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
            404 ERROR
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-950 dark:text-white">
            Page not found.
          </h1>
          <p className="font-sans text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
            The page you requested could not be located. Explore VoiceOps AI voice automation on our homepage.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
