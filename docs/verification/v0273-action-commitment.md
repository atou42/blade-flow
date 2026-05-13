# v0.2.73 Action Commitment Verification

Date: 2026-05-10

Reason: real phone feedback showed that holding four cards still allowed near-instant chaining.

## Fix

- Normal actions no longer buffer the next card during recovery.
- Only `perfect-left`, `break-confirm`, and `backstep-chase` keep a short follow-up window.
- Recovery values were raised: tap `300ms`, right `520ms`, up `460ms`, left `540ms`, down `720ms`.

## Local Probe

Mobile viewport `390x844`, four cards swiped right in one synchronous burst:

```json
{
  "version": "v0.2.73 出手承诺",
  "immediate": {
    "last": {
      "direction": "right",
      "resultType": "steady",
      "recoveryMs": 520
    },
    "recent": [
      {
        "direction": "right",
        "resultType": "steady"
      }
    ],
    "queued": null
  },
  "after620ms": {
    "recentDirections": [
      {
        "direction": "right",
        "resultType": "steady"
      }
    ]
  }
}
```

Only one card executed. The other three did not queue.

## Read Success Probe

Fast confirm left flick followed by a right flick near the end of perfect recovery still allows a follow-up:

```json
{
  "first": {
    "source": "perfect-left",
    "recovery": 180
  },
  "afterFollowUp": {
    "recentDirections": [
      "left",
      "right"
    ]
  }
}
```

This keeps the intended reward for correct reads while removing normal-card mashing.
