import germanData from '../../assets/data/german-longsword-data.json';
import italianData from '../../assets/data/italian-longsword-data.json';
import vadiData from '../../assets/data/vadi-longsword-data.json';
import {
  DATA_REGISTRY,
  getAllDisciplines,
  getDataFilePathByRecordId,
  getDataSetByIdPrefix,
  getDataSetConfig,
  getDisciplineFromRecordId,
} from '../../src/config/dataRegistry';

describe('dataRegistry', () => {
  describe('getDataSetConfig', () => {
    it('returns the config for a known discipline', () => {
      const config = getDataSetConfig('german-longsword');
      expect(config).toMatchObject({
        id: 'german-longsword',
        dataFile: 'german-longsword-data.json',
        idPrefix: 'meyer1570.long.',
      });
    });

    it('returns undefined for an unknown discipline', () => {
      // biome-ignore lint/suspicious/noExplicitAny: intentionally passing an invalid id
      expect(getDataSetConfig('klingon-batleth' as any)).toBeUndefined();
    });
  });

  describe('getDataSetByIdPrefix', () => {
    it('matches a record id to its data set by prefix', () => {
      expect(getDataSetByIdPrefix('italian.long.posta_di_donna')?.id).toBe('italian-longsword');
      expect(getDataSetByIdPrefix('meyer1570.long.vom_tag')?.id).toBe('german-longsword');
      expect(getDataSetByIdPrefix('vadi.long.posta_di_falcon')?.id).toBe('vadi-longsword');
    });

    it('returns undefined when no prefix matches', () => {
      expect(getDataSetByIdPrefix('unknown.prefix.thing')).toBeUndefined();
      expect(getDataSetByIdPrefix('')).toBeUndefined();
    });
  });

  describe('getDataFilePathByRecordId', () => {
    it('returns the asset path for a known record id', () => {
      expect(getDataFilePathByRecordId('meyer1570.long.vom_tag')).toBe(
        'assets/data/german-longsword-data.json'
      );
    });

    it('returns undefined for an unknown record id', () => {
      expect(getDataFilePathByRecordId('mystery.long.thing')).toBeUndefined();
    });
  });

  describe('getDisciplineFromRecordId', () => {
    it('resolves the discipline for each known prefix', () => {
      expect(getDisciplineFromRecordId('italian.long.punta')).toBe('italian-longsword');
      expect(getDisciplineFromRecordId('meyer1570.long.zornhau')).toBe('german-longsword');
      expect(getDisciplineFromRecordId('vadi.long.cinghiale')).toBe('vadi-longsword');
    });

    it('falls back to german-longsword for an unrecognized id', () => {
      expect(getDisciplineFromRecordId('nope')).toBe('german-longsword');
    });
  });

  describe('getAllDisciplines', () => {
    it('returns id/name/description for every registered discipline', () => {
      const all = getAllDisciplines();
      expect(all).toHaveLength(DATA_REGISTRY.length);
      for (const entry of all) {
        expect(entry.id).toBeTruthy();
        expect(entry.name).toBeTruthy();
        expect(entry.description).toBeTruthy();
        expect(Object.keys(entry).sort()).toEqual(['description', 'id', 'name']);
      }
    });
  });

  // Guard against registry/data drift: every record in every shipped data file
  // must resolve back to the discipline that owns its file.
  describe('data integrity', () => {
    const dataFiles: Array<{ file: string; records: Array<{ id: string }> }> = [
      { file: 'italian-longsword-data.json', records: italianData.records },
      { file: 'german-longsword-data.json', records: germanData.records },
      { file: 'vadi-longsword-data.json', records: vadiData.records },
    ];

    for (const { file, records } of dataFiles) {
      const config = DATA_REGISTRY.find((c) => c.dataFile === file);

      it(`registers ${file}`, () => {
        expect(config).toBeDefined();
      });

      it(`maps every record id in ${file} back to its discipline`, () => {
        expect(records.length).toBeGreaterThan(0);
        const offenders = records.filter((r) => getDisciplineFromRecordId(r.id) !== config?.id);
        expect(offenders.map((r) => r.id)).toEqual([]);
      });

      it(`every record id in ${file} carries the registered prefix`, () => {
        const prefix = config?.idPrefix ?? '';
        const offenders = records.filter((r) => !r.id.startsWith(prefix));
        expect(offenders.map((r) => r.id)).toEqual([]);
      });
    }

    it('has unique, non-overlapping id prefixes', () => {
      const prefixes = DATA_REGISTRY.map((c) => c.idPrefix);
      expect(new Set(prefixes).size).toBe(prefixes.length);
      // No prefix is a prefix of another (which would make matching order-dependent).
      for (const a of prefixes) {
        for (const b of prefixes) {
          if (a !== b) {
            expect(a.startsWith(b)).toBe(false);
          }
        }
      }
    });
  });
});
