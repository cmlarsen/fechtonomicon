# Example: Adding Vadi Longsword Data Set

This document shows the **exact steps** to add the Vadi Longsword data set that already exists in the repository at `assets/data/vadi-longsword-data.json`.

## Step 1: Add Registry Entry

Open `src/config/dataRegistry.ts` and add this entry to the `DATA_REGISTRY` array:

```typescript
export const DATA_REGISTRY: readonly DataSetConfig[] = [
  {
    id: 'italian-longsword',
    name: 'Italian Longsword',
    description: "Fiore dei Liberi and Filippo Vadi's Italian longsword systems",
    dataFile: 'italian-longsword-data.json',
    idPrefix: 'italian.long.',
  },
  {
    id: 'german-longsword',
    name: 'German Longsword',
    description: "Joachim Meyer's German longsword system",
    dataFile: 'german-longsword-data.json',
    idPrefix: 'meyer1570.long.',
  },
  // 👇 ADD THIS NEW ENTRY
  {
    id: 'vadi-longsword',
    name: 'Vadi Longsword',
    description: "Filippo Vadi's unique longsword system with detailed guard work",
    dataFile: 'vadi-longsword-data.json',
    idPrefix: 'italian.long.',  // Note: Uses same prefix as italian-longsword
  },
] as const;
```

## Step 2: Update the Discipline Type

Open `src/types/term.ts` and add `'vadi-longsword'` to the union:

```typescript
export type Discipline =
  | 'italian-longsword'
  | 'german-longsword'
  | 'vadi-longsword';  // 👈 Add this line
```

Also update `src/types/flashcard.ts` the same way:

```typescript
export type Discipline =
  | 'italian-longsword'
  | 'german-longsword'
  | 'vadi-longsword';  // 👈 Add this line
```

## Step 3: Import and Map the Data

Open `src/hooks/useCardLoader.ts`:

**3a. Add the import at the top:**

```typescript
import { useEffect, useRef, useState } from 'react';
import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import vadiData from '../../assets/data/vadi-longsword-data.json';  // 👈 Add this
```

**3b. Add to the DATA_FILE_MAP:**

```typescript
const DATA_FILE_MAP: Record<string, DataFile> = {
  'italian-longsword-data.json': italianData as DataFile,
  'german-longsword-data.json': germanData as DataFile,
  'vadi-longsword-data.json': vadiData as DataFile,  // 👈 Add this
};
```

## Step 4: Update Netlify Function (Optional)

If using the edit suggestion feature, open `netlify/functions/suggest-edit.ts` and add:

```typescript
const DATA_SETS = [
  {
    idPrefix: 'italian.long.',
    dataFile: 'assets/data/italian-longsword-data.json',
  },
  {
    idPrefix: 'meyer1570.long.',
    dataFile: 'assets/data/german-longsword-data.json',
  },
  // 👇 The prefix is the same as italian, but that's okay - it will find the right file
  {
    idPrefix: 'italian.long.',
    dataFile: 'assets/data/vadi-longsword-data.json',
  },
] as const;
```

**Note**: Since Vadi uses the same ID prefix (`italian.long.`) as the main Italian data, the Netlify function will need logic to differentiate. For now, you might want to:

**Option A**: Change Vadi's ID prefix in the JSON file to `vadi.long.` and update the registry
**Option B**: Keep the same prefix and accept that edit suggestions will target the italian-longsword file
**Option C**: Enhance the Netlify function to check multiple files with the same prefix

## Step 5: Verify

Run the validation:

```bash
yarn validate
```

Run the tests:

```bash
yarn test:ci
```

Start the app:

```bash
yarn start
```

Check that:
- ✅ Vadi terms appear in the terms list
- ✅ "Vadi Longsword" appears as a filter option
- ✅ Search finds Vadi terms
- ✅ Quiz includes Vadi terms

## That's It!

You've successfully added a new data set with just a few small changes to configuration files!

## Important Note: ID Prefix Collision

The existing `vadi-longsword-data.json` file uses IDs like `italian.long.posta_di_donna`, which is the **same prefix** as the main Italian longsword data.

### Recommended Fix

For better separation, consider updating the Vadi data file to use a unique prefix:

1. Edit `assets/data/vadi-longsword-data.json`
2. Change all IDs from `italian.long.xxx` to `vadi.long.xxx`
3. Update the registry to use `idPrefix: 'vadi.long.'`

This would make the data sets completely independent and make the Netlify function work correctly.

### Example ID Change

**Before:**
```json
{
  "id": "italian.long.posta_di_donna",
  ...
}
```

**After:**
```json
{
  "id": "vadi.long.posta_di_donna",
  ...
}
```

This is a simple find-and-replace operation in the JSON file.
