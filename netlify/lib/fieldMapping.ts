/**
 * Maps the field identifiers the app sends to the canonical keys used in the
 * data JSON files.
 *
 * The app UI sends human-readable labels as the `fieldName` (e.g. the
 * "TECHNICAL DETAILS" section submits "Technical Details"). Earlier code wrote
 * that label straight into the record as an object key, which never updated the
 * intended field and polluted records with junk keys like "Technical Details"
 * or "Description". The correct keys are `briefDescription`, `fullDescription`,
 * `briefApplication`, and `fullApplication`.
 *
 * Both the human-readable labels and the canonical keys are accepted so that
 * already-shipped app versions (which send labels) keep working while any
 * future client can send the key directly.
 */
const FIELD_KEY_BY_NAME = new Map<string, string>([
  // Human-readable labels sent by the current app UI.
  ['Description', 'briefDescription'],
  ['Application', 'briefApplication'],
  ['Technical Details', 'fullDescription'],
  ['Detailed Application', 'fullApplication'],
  // Canonical data keys, accepted directly for forward-compatibility.
  ['briefDescription', 'briefDescription'],
  ['briefApplication', 'briefApplication'],
  ['fullDescription', 'fullDescription'],
  ['fullApplication', 'fullApplication'],
]);

/**
 * Resolves an incoming field name (label or key) to the canonical data key.
 * Returns null when the field name is not recognized, so callers can reject the
 * request instead of writing an arbitrary key into the data. A Map is used so
 * that inherited object keys (e.g. "__proto__", "constructor") do not resolve
 * to a truthy value and slip past validation.
 */
export const resolveFieldKey = (fieldName: string): string | null => {
  return FIELD_KEY_BY_NAME.get(fieldName) ?? null;
};

/**
 * Returns a copy of `data` with the target card's canonical field updated.
 * Throws when the field name is unknown or the card cannot be found.
 */
export const updateCardField = (
  data: { records: Array<Record<string, unknown>> },
  cardId: string,
  fieldName: string,
  newValue: string
): { records: Array<Record<string, unknown>> } => {
  const fieldKey = resolveFieldKey(fieldName);
  if (!fieldKey) {
    throw new Error(`Unsupported field name: ${fieldName}`);
  }

  const cardIndex = data.records.findIndex((record) => record.id === cardId);
  if (cardIndex === -1) {
    throw new Error(`Card with ID ${cardId} not found`);
  }

  const updatedRecords = [...data.records];
  updatedRecords[cardIndex] = {
    ...updatedRecords[cardIndex],
    [fieldKey]: newValue,
  };

  return {
    ...data,
    records: updatedRecords,
  };
};
