import { resolveFieldKey, updateCardField } from '../../netlify/lib/fieldMapping';

describe('fieldMapping', () => {
  describe('resolveFieldKey', () => {
    it('maps human-readable UI labels to canonical data keys', () => {
      expect(resolveFieldKey('Description')).toBe('briefDescription');
      expect(resolveFieldKey('Application')).toBe('briefApplication');
      expect(resolveFieldKey('Technical Details')).toBe('fullDescription');
      expect(resolveFieldKey('Detailed Application')).toBe('fullApplication');
    });

    it('accepts canonical keys directly', () => {
      expect(resolveFieldKey('briefDescription')).toBe('briefDescription');
      expect(resolveFieldKey('fullApplication')).toBe('fullApplication');
    });

    it('returns null for unknown field names', () => {
      expect(resolveFieldKey('Nonsense')).toBeNull();
      expect(resolveFieldKey('')).toBeNull();
      expect(resolveFieldKey('__proto__')).toBeNull();
    });
  });

  describe('updateCardField', () => {
    const makeData = () => ({
      records: [
        {
          id: 'meyer1570.long.vom_tag',
          originalTerm: 'Vom Tag',
          fullDescription: 'Old technical details.',
          briefDescription: 'Old description.',
        },
      ],
    });

    it('writes the corrected value to the canonical key, not the UI label', () => {
      const result = updateCardField(
        makeData(),
        'meyer1570.long.vom_tag',
        'Technical Details',
        'New technical details.'
      );

      const record = result.records[0];
      expect(record.fullDescription).toBe('New technical details.');
      // The junk label key must never be written.
      expect(record['Technical Details']).toBeUndefined();
      expect(Object.keys(record)).not.toContain('Technical Details');
    });

    it('updates briefDescription for the "Description" label', () => {
      const result = updateCardField(
        makeData(),
        'meyer1570.long.vom_tag',
        'Description',
        'Fixed description.'
      );
      expect(result.records[0].briefDescription).toBe('Fixed description.');
      expect(result.records[0].Description).toBeUndefined();
    });

    it('does not mutate the input data', () => {
      const data = makeData();
      updateCardField(data, 'meyer1570.long.vom_tag', 'Description', 'Changed.');
      expect(data.records[0].briefDescription).toBe('Old description.');
    });

    it('throws for an unknown field name', () => {
      expect(() =>
        updateCardField(makeData(), 'meyer1570.long.vom_tag', 'Bogus Field', 'x')
      ).toThrow(/Unsupported field name/);
    });

    it('throws when the card id is not found', () => {
      expect(() => updateCardField(makeData(), 'does.not.exist', 'Description', 'x')).toThrow(
        /not found/
      );
    });
  });
});
