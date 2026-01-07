# Intermittent Bug: Wrong Row Data After Pagination

## Overview
This bug demonstrates a classic React anti-pattern involving unstable keys and stale derived state. It creates an intermittent UI integrity issue where numeric columns show data from the wrong row after pagination.

## Affected Components
- `features/issues/components/issue-list/issue-list.tsx`
- `features/issues/components/issue-list/issue-row.tsx`

## How to Reproduce

1. Start the application: `npm run dev`
2. Navigate to the Issues page: http://localhost:3000/dashboard/issues
3. Note the Events and Users values for the first few rows
4. Click "Next" to go to page 2
5. **Bug**: The Events and Users columns will show values from page 1, even though the issue names/messages are from page 2
6. Click "Previous" to go back to page 1
7. **Bug**: Now the Events and Users columns show values from page 2

## Root Causes

### Cause 1: Unstable Keys
**Location**: `issue-list.tsx`, line 57

```tsx
// ❌ WRONG - Using array index as key
{(items || []).map((issue, index) => (
  <IssueRow
    key={index}  // This causes React to reuse components incorrectly
    issue={issue}
    projectLanguage={projectIdToLanguage[issue.projectId]}
  />
))}
```

**Problem**: When pagination changes, the items in the array change, but the keys remain the same (0, 1, 2, 3...). React thinks the component at position 0 on page 2 is the "same" as the component at position 0 on page 1, so it reuses the component instance.

### Cause 2: Stale Derived State
**Location**: `issue-row.tsx`, lines 27-28

```tsx
// ❌ WRONG - Initializing state from props without synchronization
const [cachedNumEvents] = useState(numEvents);
const [cachedNumUsers] = useState(numUsers);
```

**Problem**: `useState` only uses the initial value once when the component is first created. When React reuses the component (due to index-based keys), the state doesn't update even though new props arrive with different values.

## The Fix

### Fix 1: Use Stable Keys
```tsx
// ✅ CORRECT - Using stable unique identifier
{(items || []).map((issue) => (
  <IssueRow
    key={issue.id}  // Each issue has a unique, stable ID
    issue={issue}
    projectLanguage={projectIdToLanguage[issue.projectId]}
  />
))}
```

### Fix 2: Remove Unnecessary State
```tsx
// ✅ CORRECT - Use props directly
export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  return (
    <tr className={styles.row}>
      {/* ... */}
      <td className={styles.cell}>{numEvents}</td>
      <td className={styles.cell}>{numUsers}</td>
    </tr>
  );
}
```

## Why This Pattern Matters

This is a **real production bug pattern** that:
- ✅ Happens in real applications
- ✅ Is intermittent and hard to reproduce
- ✅ Requires understanding React internals
- ✅ Tests debugging skills, not just coding knowledge

## Interview Discussion Points

Senior developers should be able to:
1. Identify that using `index` as a key is problematic
2. Explain React's reconciliation algorithm
3. Recognize the derived state anti-pattern
4. Understand when `useState` initial values are used
5. Suggest using stable keys + removing unnecessary state
6. Discuss alternative solutions (useEffect with dependencies, useMemo, etc.)

## Related Resources
- [React Docs: List Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [React Docs: useState](https://react.dev/reference/react/useState)
- [React Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
