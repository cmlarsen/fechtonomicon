import { act, renderHook } from '@testing-library/react-native';
import { useCardIndex } from '../../src/hooks/useCardIndex';
import type { Term } from '../../src/types/term';

type HookResult = ReturnType<typeof useCardIndex>;

jest.mock('../../src/services/widgetService', () => ({
  widgetService: { updateWidget: jest.fn(), updateAllTerms: jest.fn(), isAvailable: () => false },
}));

const makeCards = (prefix: string, count: number): Term[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}.${i}`,
    category: 'guard',
    weapon: 'longsword',
    originalTerm: `${prefix} ${i}`,
    englishTerm: `${prefix} ${i}`,
    briefDescription: 'desc',
    discipline: 'german-longsword',
  })) as Term[];

describe('useCardIndex', () => {
  it('starts at the first card', () => {
    const cards = makeCards('a', 5);
    const { result } = renderHook(() => useCardIndex({ cards }));
    expect(result.current.currentCardIndex).toBe(0);
    expect(result.current.currentCard?.id).toBe('a.0');
  });

  it('selects a card by index', () => {
    const cards = makeCards('a', 5);
    const { result } = renderHook(() => useCardIndex({ cards }));
    act(() => result.current.handleCardSelect(3));
    expect(result.current.currentCard?.id).toBe('a.3');
  });

  it('jumps to a card delivered via routeCardId', () => {
    const cards = makeCards('a', 5);
    const { result, rerender } = renderHook<HookResult, { routeCardId: string | undefined }>(
      ({ routeCardId }) => useCardIndex({ cards, routeCardId }),
      {
        initialProps: { routeCardId: undefined },
      }
    );
    act(() => rerender({ routeCardId: 'a.4' }));
    expect(result.current.currentCard?.id).toBe('a.4');
  });

  it('does not re-jump to the route card after the user navigates and the list ref changes', () => {
    // Regression: a stale route param used to override Prev/Next whenever the
    // cards array got a new reference.
    const cards = makeCards('a', 5);
    const { result, rerender } = renderHook<
      HookResult,
      { cards: Term[]; routeCardId: string | undefined }
    >(({ cards: c, routeCardId }) => useCardIndex({ cards: c, routeCardId }), {
      initialProps: { cards, routeCardId: 'a.1' },
    });
    expect(result.current.currentCard?.id).toBe('a.1');

    // User pages forward.
    act(() => result.current.handleCardSelect(3));
    expect(result.current.currentCard?.id).toBe('a.3');

    // A new array reference with identical content arrives (route param unchanged).
    act(() => rerender({ cards: [...cards], routeCardId: 'a.1' }));

    // Position is preserved, not reset back to the route card.
    expect(result.current.currentCard?.id).toBe('a.3');
  });

  it('resets to the first card when switching to a same-length list without the current card', () => {
    // Regression: a length-only comparison left the index pointing at an
    // unrelated card after a same-size discipline switch.
    const a = makeCards('a', 5);
    const b = makeCards('b', 5);
    const { result, rerender } = renderHook<HookResult, { cards: Term[] }>(
      ({ cards }) => useCardIndex({ cards }),
      {
        initialProps: { cards: a },
      }
    );
    act(() => result.current.handleCardSelect(4));
    expect(result.current.currentCard?.id).toBe('a.4');

    act(() => rerender({ cards: b }));
    expect(result.current.currentCardIndex).toBe(0);
    expect(result.current.currentCard?.id).toBe('b.0');
  });

  it('follows the current card when the same list arrives reordered', () => {
    const cards = makeCards('a', 5);
    const { result, rerender } = renderHook<HookResult, { cards: Term[] }>(
      ({ cards: c }) => useCardIndex({ cards: c }),
      {
        initialProps: { cards },
      }
    );
    act(() => result.current.handleCardSelect(2)); // a.2
    expect(result.current.currentCard?.id).toBe('a.2');

    const reordered = [...cards].reverse(); // a.2 now at index 2 -> becomes index 2 reversed
    act(() => rerender({ cards: reordered }));
    // a.2 is still present; the hook should keep showing it, not reset.
    expect(result.current.currentCard?.id).toBe('a.2');
  });
});
