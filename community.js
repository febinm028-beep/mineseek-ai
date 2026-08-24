// ---------------------------------------------------------------------------
// COMMUNITY LAYER (architecture stub)
// ---------------------------------------------------------------------------
// Real submissions require accounts, moderation and a database — out of
// scope for a ₹0 prototype. This module defines the SHAPE of a submission
// and stores drafts in-memory (per session) so the UI/flow can be built and
// tested end-to-end today. See README.md → "Community system later" for how
// to wire this to a real backend (Supabase free tier is a good ₹0 option).
// ---------------------------------------------------------------------------

let draftSubmissions = [];

/**
 * @typedef {Object} SeedSubmission
 * @property {string} seed
 * @property {'Java'|'Bedrock'} edition
 * @property {string} version
 * @property {string} description
 * @property {string[]} screenshots  // object URLs or filenames for now
 * @property {{x:number,y:number,z:number}} spawn
 * @property {string[]} tags
 */

export function submitSeed(submission) {
  const record = {
    ...submission,
    id: `pending-${Date.now()}`,
    status: 'pending-review', // pending-review | approved | rejected
    likes: 0,
    reports: 0,
    submittedAt: new Date().toISOString()
  };
  draftSubmissions = [record, ...draftSubmissions];
  return record;
}

export function getPendingSubmissions() {
  return draftSubmissions;
}

export function likeSubmission(id) {
  draftSubmissions = draftSubmissions.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s));
  return draftSubmissions;
}

export function reportSubmission(id) {
  draftSubmissions = draftSubmissions.map((s) => (s.id === id ? { ...s, reports: s.reports + 1 } : s));
  return draftSubmissions;
}
