import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchDrawerContent } from '../../src/native/components/SearchDrawerContent';
import { useTermsSearch } from '../../src/contexts/TermsSearchContext';
import { TermsSearchProvider } from '../../src/contexts/TermsSearchContext';

// SearchDrawerContent only reads `navigation`, so stub just that and cast to
// the component's props to avoid rebuilding the full drawer navigation state.
const navigation = {
  closeDrawer: jest.fn(),
  navigate: jest.fn(),
};
const drawerProps = { navigation } as unknown as React.ComponentProps<typeof SearchDrawerContent>;

const metrics = {
  frame: { x: 0, y: 0, width: 320, height: 640 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const renderDrawer = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <TermsSearchProvider>
        <SearchDrawerContent {...drawerProps} />
      </TermsSearchProvider>
    </SafeAreaProvider>
  );

describe('SearchDrawerContent', () => {
  it('renders a search input so the drawer is actually searchable on native', () => {
    renderDrawer();
    // Regression: the drawer previously rendered no TermsSearchBar, so search
    // was impossible on native.
    expect(screen.getByPlaceholderText('Search terms...')).toBeTruthy();
  });

  it('updates the shared search query as the user types', () => {
    // A probe component reads the context so we can assert the query changed.
    let latestQuery = 'unset';
    const Probe = () => {
      latestQuery = useTermsSearch().searchQuery;
      return null;
    };

    render(
      <SafeAreaProvider initialMetrics={metrics}>
        <TermsSearchProvider>
          <SearchDrawerContent {...drawerProps} />
          <Probe />
        </TermsSearchProvider>
      </SafeAreaProvider>
    );

    fireEvent.changeText(screen.getByPlaceholderText('Search terms...'), 'zorn');
    expect(latestQuery).toBe('zorn');
  });
});
