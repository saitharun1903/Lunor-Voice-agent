/**
 * VOICEOPS Centralized Motion & Animation Design Tokens
 * Follows the physical, precise, editorial motion language guidelines:
 * - Timings: micro (120-180ms), interaction (180-320ms), component (300-500ms), section (400-700ms), cinematic (700-1200ms)
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1) and subtle, non-bouncy physical springs
 */

export const MOTION_DURATIONS = {
  micro: 0.16,
  interaction: 0.28,
  component: 0.45,
  section: 0.65,
  cinematic: 0.95,
} as const;

export const MOTION_EASINGS = {
  editorial: [0.22, 1, 0.36, 1] as const,
  standard: [0.16, 1, 0.3, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
};

export const MOTION_SPRINGS = {
  subtle: { type: "spring", stiffness: 420, damping: 36, mass: 0.8 },
  responsive: { type: "spring", stiffness: 380, damping: 30 },
  floating: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
} as const;
