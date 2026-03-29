export type MotionPreset = "calm" | "balanced" | "dynamic";

// Change only this value to switch the global animation feel.
export const MOTION_PRESET: MotionPreset = "balanced";

const presetClassMap: Record<MotionPreset, string> = {
  calm: "motion-calm",
  balanced: "motion-balanced",
  dynamic: "motion-dynamic",
};

export function getMotionPresetClass(preset: MotionPreset): string {
  return presetClassMap[preset];
}
