// All mock data is generated ONCE at module load time.
// This prevents Math.random() from re-running on every render,
// which was causing Fast Refresh loops and hydration mismatches.
import { generateMockCandidates, getDashboardStats } from "./mockData";
import { Candidate } from "./types";
import { DashboardStats } from "./types";

let _candidates: Candidate[] | null = null;
let _stats: DashboardStats | null = null;

export function getCandidates(): Candidate[] {
  if (!_candidates) _candidates = generateMockCandidates(20);
  return _candidates;
}

export function getStats(): DashboardStats {
  if (!_stats) _stats = getDashboardStats();
  return _stats;
}

export function resetData() {
  _candidates = null;
  _stats = null;
}
