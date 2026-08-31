export type VoiceAgentState =
  | "ready"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "ending"
  | "error";

export interface VoiceMessage {
  id: string;
  role: "user" | "agent" | "system";
  text: string;
  timestamp: Date;
}

export interface VoiceAgentConfig {
  agentName?: string;
  industryId?: string;
  scenarioName?: string;
  greeting?: string;
  systemPrompt?: string;
}

export interface IVoiceAgentProvider {
  initialize(config?: VoiceAgentConfig): Promise<void>;
  startSession(): Promise<void>;
  stopSession(): Promise<void>;
  sendMessage(text: string): Promise<void>;
  getAudioData(): Uint8Array | null;
  getState(): VoiceAgentState;
  onStateChange(cb: (state: VoiceAgentState) => void): void;
  onMessage(cb: (msg: VoiceMessage) => void): void;
  onError(cb: (error: string) => void): void;
  onVolumeChange?(cb: (volume: number) => void): void;
  dispose(): void;
}
