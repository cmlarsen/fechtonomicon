# Adding New Data Sets to Fechtonomicon

This guide shows you how to add new martial arts data sets (e.g., new weapon systems, new masters, etc.) to Fechtonomicon with minimal code changes.

## Quick Start (3 Simple Steps)

### 1. Prepare Your Data File

Create a JSON file in `assets/data/` following this structure:

```json
{
  "meta": {
    "title": "Your System Name"
  },
  "records": [
    {
      "id": "your-prefix.weapon.technique-name",
      "originalTerm": "Original Language Term",
      "englishTerm": "English Translation",
      "category": "guard|strike|thrust|footwork|concept|technique|handwork",
      "master": ["Master Name"],
      "weapon": "longsword",
      "briefDescription": "One-sentence overview",
      "fullDescription": "Detailed explanation...",
      "briefApplication": "How to use it briefly",
      "fullApplication": "Detailed tactical application...",
      "videoLinks": [
        {
          "title": "Video Title",
          "url": "https://youtube.com/..."
        }
      ]
    }
  ]
}
```

**Key Requirements:**
- Each record must have a unique `id` with a consistent prefix (e.g., `vadi.long.`, `fiore.dagger.`, `silver.rapier.`)
- The `id` prefix will be used to automatically map records to their discipline
- Required fields: `id`, `originalTerm`, `englishTerm`, `category`, `briefDescription`
- Optional fields: `fullDescription`, `briefApplication`, `fullApplication`, `videoLinks`, `master`, `weapon`

### 2. Update the Data Registry

Open `src/config/dataRegistry.ts` and add an entry to the `DATA_REGISTRY` array:

```typescript
export const DATA_REGISTRY: readonly DataSetConfig[] = [
  // ... existing entries ...
  {
    id: 'your-discipline-id',           // Must be unique, kebab-case
    name: 'Display Name',               // Human-readable name
    description: 'Brief description',   // Shown in filtering UI
    dataFile: 'your-data-file.json',    // Filename in assets/data/
    idPrefix: 'your-prefix.weapon.',    // Must match IDs in your data file
  },
];
```

### 3. Add Type and Import

**3a. Update the Discipline Type**

Open `src/types/term.ts` and add your discipline ID to the union type:

```typescript
export type Discipline =
  | 'italian-longsword'
  | 'german-longsword'
  | 'your-discipline-id';  // Add this line
```

**3b. Import the Data File**

Open `src/hooks/useCardLoader.ts`:

1. Add the import at the top:
```typescript
import yourData from '../../assets/data/your-data-file.json';
```

2. Add it to the `DATA_FILE_MAP`:
```typescript
const DATA_FILE_MAP: Record<string, DataFile> = {
  'italian-longsword-data.json': italianData as DataFile,
  'german-longsword-data.json': germanData as DataFile,
  'your-data-file.json': yourData as DataFile,  // Add this line
};
```

**3c. Update Netlify Function (Optional)**

If you're using the edit suggestion feature, open `netlify/functions/suggest-edit.ts` and add an entry to the `DATA_SETS` array:

```typescript
const DATA_SETS = [
  // ... existing entries ...
  {
    idPrefix: 'your-prefix.weapon.',
    dataFile: 'assets/data/your-data-file.json',
  },
];
```

## That's It! 🎉

Your new data set will now:
- ✅ Automatically load on app startup
- ✅ Appear in the terms list
- ✅ Be searchable
- ✅ Be filterable by discipline
- ✅ Work with the quiz system
- ✅ Support edit suggestions (if you updated the Netlify function)

## Example: Adding Vadi Longsword

Here's a concrete example of adding Filippo Vadi's longsword system:

**1. Create `assets/data/vadi-longsword-data.json`:**

```json
{
  "meta": {
    "title": "Vadi Longsword"
  },
  "records": [
    {
      "id": "vadi.long.posta_donna",
      "originalTerm": "Posta di Donna",
      "englishTerm": "Lady's Guard",
      "category": "guard",
      "master": ["Filippo Vadi"],
      "weapon": "longsword",
      "briefDescription": "The highest-regarded guard in Vadi's system..."
    }
  ]
}
```

**2. Update `src/config/dataRegistry.ts`:**

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
  {
    id: 'vadi-longsword',
    name: 'Vadi Longsword',
    description: "Filippo Vadi's unique longsword system",
    dataFile: 'vadi-longsword-data.json',
    idPrefix: 'vadi.long.',
  },
];
```

**3. Update `src/types/term.ts`:**

```typescript
export type Discipline =
  | 'italian-longsword'
  | 'german-longsword'
  | 'vadi-longsword';
```

**4. Update `src/hooks/useCardLoader.ts`:**

```typescript
import vadiData from '../../assets/data/vadi-longsword-data.json';

const DATA_FILE_MAP: Record<string, DataFile> = {
  'italian-longsword-data.json': italianData as DataFile,
  'german-longsword-data.json': germanData as DataFile,
  'vadi-longsword-data.json': vadiData as DataFile,
};
```

**5. Update `netlify/functions/suggest-edit.ts`:**

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
  {
    idPrefix: 'vadi.long.',
    dataFile: 'assets/data/vadi-longsword-data.json',
  },
];
```

## Architecture Notes

### Why This Design?

The system uses a **registry pattern** with **convention-based loading**:

1. **Single Source of Truth**: `src/config/dataRegistry.ts` defines all data sets
2. **Automatic Mapping**: ID prefixes automatically map records to disciplines
3. **Type Safety**: TypeScript ensures all references are valid
4. **Minimal Changes**: Adding a new data set requires touching only 4 files

### ID Prefix Convention

Choose meaningful ID prefixes that follow this pattern:

- `master.weapon.technique-name` - For master-specific techniques
  - Example: `meyer1570.long.zornhau`
- `tradition.weapon.technique-name` - For tradition-specific techniques
  - Example: `italian.long.posta_longa`
- `source.weapon.technique-name` - For source-specific techniques
  - Example: `vadi.long.posta_donna`

### File Locations

- **Data Files**: `assets/data/your-file.json`
- **Registry**: `src/config/dataRegistry.ts`
- **Types**: `src/types/term.ts`
- **Loader**: `src/hooks/useCardLoader.ts`
- **Netlify Function**: `netlify/functions/suggest-edit.ts`

## Testing Your New Data Set

After adding a data set:

1. **Run Type Checking**:
   ```bash
   yarn typecheck
   ```

2. **Run Linting**:
   ```bash
   yarn lint
   ```

3. **Start the App**:
   ```bash
   yarn start
   ```

4. **Verify**:
   - Check that terms from your data set appear in the terms list
   - Filter by your new discipline
   - Search for terms from your data set
   - Try the quiz with your terms

## Common Issues

### "Discipline not found"
- Make sure you added the discipline to the `Discipline` type in `src/types/term.ts`
- Ensure the `id` in the registry matches what you added to the type

### "Data file not found"
- Verify the filename in the registry matches the actual file in `assets/data/`
- Make sure you added the import and mapping in `useCardLoader.ts`

### "Terms not showing up"
- Check that all record IDs in your JSON file start with the `idPrefix` you defined
- Verify the JSON structure matches the expected format
- Check browser console for any loading errors

## Future Improvements

This system could be enhanced to:
- Automatically discover data files (requires build-time generation)
- Validate data files against a schema at build time
- Generate the Discipline type from the registry (requires build-time codegen)
- Support dynamic imports for code splitting

For now, the current system balances simplicity with extensibility.

## Need Help?

If you run into issues:
1. Check the browser console for errors
2. Verify your JSON syntax with a JSON validator
3. Ensure all file paths are correct
4. Run `yarn typecheck` and `yarn lint` to catch issues early

Happy data adding! ⚔️
