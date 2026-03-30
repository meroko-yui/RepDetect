/**
 * Severity thresholds (in word-index distance).
 */
const SEVERITY = {
  HIGH: { maxDistance: 20, label: 'high', color: '#ef4444' },   // red
  MEDIUM: { maxDistance: 50, label: 'medium', color: '#f97316' }, // orange
  LOW: { maxDistance: 100, label: 'low', color: '#eab308' },     // yellow
};

/**
 * Detects repeated words within a proximity window.
 *
 * @param {Array} tokens - Stemmed, non-stopword tokens (must have .stem, .index)
 * @param {number} [window=100] - Max word-index distance to consider a repetition
 * @returns {Object} { repetitions: Map<stem, RepetitionGroup>, tokenSeverities: Map<tokenIndex, severity> }
 *
 * RepetitionGroup: { stem, variants: Set<string>, occurrences: [{ token, nearbyTokens }] }
 */
export function detectRepetitions(tokens, window = 100) {
  // Group tokens by stem
  const stemGroups = new Map();
  for (const token of tokens) {
    if (!stemGroups.has(token.stem)) {
      stemGroups.set(token.stem, []);
    }
    stemGroups.get(token.stem).push(token);
  }

  const repetitions = new Map();
  // Maps token.index → worst (closest) severity
  const tokenSeverities = new Map();

  for (const [stem, group] of stemGroups) {
    if (group.length < 2) continue;

    const variants = new Set(group.map(t => t.word));
    const occurrences = [];

    for (let i = 0; i < group.length; i++) {
      const token = group[i];
      const nearby = [];

      for (let j = 0; j < group.length; j++) {
        if (i === j) continue;
        const distance = Math.abs(token.index - group[j].index);
        if (distance <= window) {
          nearby.push({ token: group[j], distance });
        }
      }

      if (nearby.length > 0) {
        occurrences.push({ token, nearby });

        // Assign worst severity based on closest neighbor
        const minDistance = Math.min(...nearby.map(n => n.distance));
        const severity = getSeverity(minDistance);
        if (severity) {
          const existing = tokenSeverities.get(token.index);
          if (!existing || severityRank(severity) > severityRank(existing)) {
            tokenSeverities.set(token.index, severity);
          }
        }
      }
    }

    if (occurrences.length > 0) {
      repetitions.set(stem, {
        stem,
        count: group.length,
        variants,
        occurrences,
      });
    }
  }

  return { repetitions, tokenSeverities };
}

function getSeverity(distance) {
  if (distance <= SEVERITY.HIGH.maxDistance) return SEVERITY.HIGH;
  if (distance <= SEVERITY.MEDIUM.maxDistance) return SEVERITY.MEDIUM;
  if (distance <= SEVERITY.LOW.maxDistance) return SEVERITY.LOW;
  return null;
}

function severityRank(severity) {
  if (severity.label === 'high') return 3;
  if (severity.label === 'medium') return 2;
  if (severity.label === 'low') return 1;
  return 0;
}

export { SEVERITY };
