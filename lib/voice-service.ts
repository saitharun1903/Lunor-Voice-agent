import { WebSession, TranscriptEvent } from "@omnidim-ai/client";

export type LunoVoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "muted"
  | "ending"
  | "ended"
  | "error";

export interface VoiceServiceListener {
  onStateChange: (state: LunoVoiceState) => void;
  onTranscript?: (transcript: TranscriptEvent) => void;
  onError: (errorMessage: string) => void;
}

export class VoiceAgentService {
  private session: WebSession | null = null;
  private state: LunoVoiceState = "idle";
  private isMuted: boolean = false;
  private listeners: VoiceServiceListener[] = [];
  private activeWsUrl: string | null = null;

  public getState(): LunoVoiceState {
    return this.state;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(listener: VoiceServiceListener): () => void {
    this.listeners.push(listener);
    listener.onStateChange(this.state);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setState(newState: LunoVoiceState) {
    this.state = newState;
    this.listeners.forEach((l) => l.onStateChange(newState));
  }

  private emitTranscript(transcript: TranscriptEvent) {
    // If agent is speaking in transcript and not final, update state
    if (transcript.role === "agent" && !this.isMuted && this.state !== "error") {
      this.setState("speaking");
    } else if (transcript.role === "user" && !this.isMuted && this.state !== "error") {
      this.setState("listening");
    }
    this.listeners.forEach((l) => l.onTranscript?.(transcript));
  }

  private emitError(message: string) {
    this.setState("error");
    this.listeners.forEach((l) => l.onError(message));
  }

  public async start(): Promise<void> {
    if (this.state === "connecting" || this.state === "listening" || this.state === "speaking") {
      return; // Prevent duplicate sessions
    }

    try {
      this.setState("connecting");

      // 1. Request short-lived session token from VoiceOps backend
      const res = await fetch("/api/voice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "VoiceOps live demo is temporarily unavailable.");
      }

      const { ws_url } = await res.json();
      if (!ws_url) {
        throw new Error("We couldn't start the conversation. Please try again.");
      }

      this.activeWsUrl = ws_url;

      // 2. Initialize WebSession
      const session = new WebSession();
      this.session = session;
      this.isMuted = false;

      session.on("status", (status) => {
        if (status === "connecting") {
          this.setState("connecting");
        } else if (status === "active") {
          this.setState(this.isMuted ? "muted" : "listening");
        } else if (typeof status === "object" && status.state === "ended") {
          if (status.reason === "insufficient_balance") {
            this.emitError("The demo session has reached its capacity. Please contact VoiceOps.");
          } else if (status.reason === "connection_lost") {
            this.emitError("Connection interrupted. Please check your network and try again.");
          } else {
            this.setState("ended");
            setTimeout(() => {
              if (this.state === "ended") this.setState("idle");
            }, 2500);
          }
        }
      });

      session.on("transcript", (event) => {
        this.emitTranscript(event);
      });

      session.on("error", (err: Error) => {
        const errMsg = err?.message || "";
        if (errMsg.includes("Permission denied") || errMsg.includes("NotAllowedError") || errMsg.includes("permission")) {
          this.emitError("Microphone access is required to talk to VoiceOps.");
        } else {
          this.emitError("We couldn't start the conversation. Please try again.");
        }
      });

      // 3. Connect to live voice agent (browser asks for mic permission)
      await session.start({ wsUrl: ws_url });
    } catch (err: any) {
      console.error("[VoiceAgentService] Start error:", err);
      const msg = err?.message || "";
      if (msg.includes("Permission denied") || msg.includes("NotAllowedError")) {
        this.emitError("Microphone access is required to talk to VoiceOps.");
      } else {
        this.emitError(err.message || "We couldn't start the conversation. Please try again.");
      }
    }
  }

  public toggleMute(): void {
    if (!this.session) return;
    this.isMuted = !this.isMuted;
    this.session.mute(this.isMuted);
    if (this.state !== "error" && this.state !== "ended") {
      this.setState(this.isMuted ? "muted" : "listening");
    }
  }

  public stop(): void {
    if (this.session) {
      this.setState("ending");
      try {
        this.session.stop();
      } catch (e) {
        // ignore
      }
      this.session = null;
      this.activeWsUrl = null;
      setTimeout(() => {
        this.setState("idle");
      }, 400);
    } else {
      this.setState("idle");
    }
  }
}

// Global Singleton for the single live voice demo
let serviceInstance: VoiceAgentService | null = null;

export function getVoiceAgentService(): VoiceAgentService {
  if (!serviceInstance) {
    serviceInstance = new VoiceAgentService();
  }
  return serviceInstance;
}
