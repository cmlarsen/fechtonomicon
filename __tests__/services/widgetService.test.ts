import { toWidgetTerm } from '../../src/services/widgetService';
import type { Term } from '../../src/types/term';

const makeCard = (overrides: Partial<Term> = {}): Term => ({
  id: 'meyer1570.long.zornhau',
  category: 'strike',
  weapon: 'longsword',
  originalTerm: 'Zornhau',
  englishTerm: 'Wrath Cut',
  briefDescription: 'A diagonal cut from the shoulder.',
  discipline: 'german-longsword',
  ...overrides,
});

describe('toWidgetTerm', () => {
  it('sends the discipline display name, not the weapon', () => {
    const result = toWidgetTerm(makeCard());
    expect(result.discipline).toBe('German Longsword');
    // Regression: previously this was card.weapon ("longsword").
    expect(result.discipline).not.toBe('longsword');
  });

  it('maps each discipline to its display name', () => {
    expect(toWidgetTerm(makeCard({ discipline: 'italian-longsword' })).discipline).toBe(
      'Italian Longsword'
    );
    expect(toWidgetTerm(makeCard({ discipline: 'vadi-longsword' })).discipline).toBe(
      'Vadi Longsword'
    );
  });

  it('maps the core term fields', () => {
    const result = toWidgetTerm(makeCard());
    expect(result).toMatchObject({
      id: 'meyer1570.long.zornhau',
      term: 'Zornhau',
      translation: 'Wrath Cut',
      description: 'A diagonal cut from the shoulder.',
    });
  });

  it('falls back to an empty description and discipline when missing', () => {
    const result = toWidgetTerm(makeCard({ briefDescription: undefined, discipline: undefined }));
    expect(result.description).toBe('');
    expect(result.discipline).toBe('');
  });
});
