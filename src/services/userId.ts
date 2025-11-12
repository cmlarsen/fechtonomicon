import { storage } from './storage';

/**
 * Generates a short unique user ID (8 characters)
 * Uses a combination of timestamp and random characters
 */
const generateUserId = (): string => {
  const timestamp = Date.now().toString(36).slice(-4);
  const random = Math.random().toString(36).substring(2, 6);
  return `${timestamp}${random}`.toLowerCase();
};

/**
 * Gets or creates a user ID
 * If no user ID exists, creates a new one and stores it
 */
export const getOrCreateUserId = async (): Promise<string> => {
  let userId = await storage.getUserId();
  if (!userId) {
    userId = generateUserId();
    await storage.setUserId(userId);
  }
  return userId;
};

/**
 * Gets the current user ID (returns null if not set)
 */
export const getUserId = async (): Promise<string | null> => {
  return await storage.getUserId();
};
