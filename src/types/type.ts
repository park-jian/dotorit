import { ReactNode } from 'react';

export interface OnboardingLayoutProps {
    step: number;
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    children: ReactNode;
    footer: ReactNode;
  }