export type RootStackParamList = {
  Main: { screen: keyof RootTabParamList; params?: { cardId?: string } } | undefined;
  Search: undefined;
  Quiz: undefined;
  Settings: undefined;
};

export type RootTabParamList = {
  Terms: { cardId?: string } | undefined;
  Quiz: undefined;
  Settings?: undefined;
};

export type RootDrawerParamList = {
  Terms: { cardId?: string } | undefined;
};
