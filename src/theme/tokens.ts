export const colors = {
  // Manuscript parchment tones
  parchment: {
    primary: '#F8F4E8',    // Warm aged paper
    light: '#FFF8EE',       // Light vellum
    dark: '#EDD9BF',        // Aged edges
  },
  // Antique gold accents
  gold: {
    main: '#C9AB6A',        // Antique gold
    light: '#E8D4A0',       // Pale gold
    dark: '#B8964D',        // Deep gold
  },
  // Iron gray for text
  iron: {
    main: '#5C5B58',        // Iron gray
    dark: '#3A3936',        // Dark iron
    light: '#8B8A87',       // Light iron
  },
  // Keep legacy for compatibility
  primary: {
    dark: '#3D2817',
    main: '#5C3D2E',
    light: '#8B6F47',
    lighter: '#BFA480',
  },
  secondary: {
    dark: '#6B1B1B',
    main: '#8B2C2C',
    light: '#B85C5C',
  },
  background: {
    primary: '#F8F4E8',    // Updated to new parchment
    secondary: '#EDD9BF',
    card: '#FFF8EE',
    dark: '#2A1810',
  },
  text: {
    primary: '#3A3936',    // Updated to dark iron
    secondary: '#5C5B58',  // Updated to iron gray
    light: '#8B8A87',      // Updated to light iron
    inverse: '#F8F4E8',
  },
  accent: {
    gold: '#C9AB6A',       // Updated to antique gold
    goldLight: '#E8D4A0',
    burgundy: '#722F37',
    burgundyLight: '#9B4A54',
  },
  border: {
    light: '#D4C4B0',
    main: '#C9AB6A',       // Updated to antique gold
    dark: '#B8964D',
  },
  shadow: 'rgba(42, 24, 16, 0.15)',
  overlay: 'rgba(42, 24, 16, 0.4)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 18,        // Increased from 16 for better readability
  lg: 20,        // Increased from 18
  xl: 26,        // Increased from 24
  xxl: 34,       // Increased from 32
  xxxl: 36,      // Increased from 40
};

export const fontFamily = {
  title: 'Texturina-ExtraBold',
  titleBold: 'Texturina-Bold',
  titleSemiBold: 'Texturina-SemiBold',
  bodyLight: 'CormorantGaramond-Light',
  bodyLightItalic: 'CormorantGaramond-LightItalic',
  body: 'CormorantGaramond-Regular',
  bodyItalic: 'CormorantGaramond-Italic',
  bodyMedium: 'CormorantGaramond-Medium',
  bodyMediumItalic: 'CormorantGaramond-MediumItalic',
  bodySemiBold: 'CormorantGaramond-SemiBold',
  bodySemiBoldItalic: 'CormorantGaramond-SemiBoldItalic',
  bodyBold: 'CormorantGaramond-Bold',
  bodyBoldItalic: 'CormorantGaramond-BoldItalic',
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  // Manuscript-specific shadows
  embossed: {
    // Raised text effect
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 0,
  },
  inset: {
    // Inset vellum effect
    shadowColor: '#2A1810',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0,
  },
  parchment: {
    // Layered paper effect
    shadowColor: '#B8964D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
};
