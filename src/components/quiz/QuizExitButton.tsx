import React from 'react';
import { IconButton } from '../buttons';

interface QuizExitButtonProps {
  onPress: () => void;
}

export const QuizExitButton: React.FC<QuizExitButtonProps> = ({ onPress }) => {
  return <IconButton icon="✕" onPress={onPress} size="medium" variant="burgundy" />;
};
