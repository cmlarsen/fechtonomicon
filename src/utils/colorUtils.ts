/**
 * Converts a hex color to RGBA format
 * @param hex - Hex color string (with or without #, e.g., '#FFFFFF' or 'FFFFFF')
 * @param alpha - Alpha value between 0 and 1
 * @returns RGBA string (e.g., 'rgba(255, 255, 255, 0.3)')
 * @example
 * rgba('#FFFFFF', 0.3) // returns 'rgba(255, 255, 255, 0.3)'
 * rgba('C9AB6A', 0.5) // returns 'rgba(201, 171, 106, 0.5)'
 */
export function rgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Validate hex format (must be 3 or 6 characters)
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  // Validate alpha range
  if (alpha < 0 || alpha > 1) {
    throw new Error(`Alpha must be between 0 and 1, got: ${alpha}`);
  }

  // Parse hex to RGB
  let r: number;
  let g: number;
  let b: number;

  if (cleanHex.length === 3) {
    // Handle shorthand hex (e.g., 'FFF' -> 'FFFFFF')
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    // Handle full hex (e.g., 'FFFFFF')
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
