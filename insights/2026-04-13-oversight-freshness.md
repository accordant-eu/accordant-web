# Oversight Freshness over Heuristic Trust Scores

**13 April 2026**

We established a core principle for agent autonomy: trust is not a number that decays on a schedule.

## What changed

Instead of implementing task-specific dynamic trust scores with algorithmic decay, we shifted to tracking **oversight freshness**. Each autonomous workflow carries a timestamp of the last human review. When that timestamp becomes stale relative to the task's risk profile, the workflow is flagged for explicit qualitative review rather than automatically restricted by a decaying score.

## Why we made the change

Numeric trust scores and automated decay push too much strategic judgment into heuristic machinery. They create the illusion of calibrated autonomy while actually deferring the real decision to an algorithm that cannot see context, intent, or emerging risk. Oversight freshness keeps the human in the loop at the right moments without pretending the machine can manage trust on its behalf.

## What we kept simple

- No complex scoring formulas.
- No automatic demotion of agents or workflows.
- The flag is a signal for human attention, not an enforcement mechanism.
- The definition of "stale" remains a human judgment call per domain and task type.

## Impact

This removed a layer of hidden automation that would have required constant tuning and would have been difficult to audit. It also aligned with the broader direction of making boundaries explicit rather than burying governance in opaque calculations.

## Forward

Later refinements in decision discipline and validation checkpoints would build on this foundation: autonomy is granted and maintained through deliberate human engagement, not through accumulated points that slowly leak away.
