// React 컴포넌트에서 사용할 색상 상수
export const colors = {
  // Basic Color
  white: '#fff',
  black: '#000',
  background: '#F9FAFB',
  
  // Gray
  gray900: '#0F172A',
  gray800: '#1E293B',
  gray500: '#64748B',
  gray400: '#94A3B8',
  gray300: '#CBD5E1',
  gray200: '#E2E8F0',
  gray100: '#F1F5F9',
  
  // Violet
  violet600: '#7C3AED',
  violet100: '#EDE9FE',
  
  // Amber
  amber800: '#92400E',
  
  // Buttons
  buttonDeactive: '#E2E8F0',
  buttonAdd: '#7C3AED',
  buttonDelete: '#F43F5E',
  buttonEdit: '#BEF264',
} as const;

// TypeScript 타입 정의
export type ColorKey = keyof typeof colors;

