import React from 'react';

/**
 * Simple divider component.
 */
export function Divider(): React.ReactElement {
  return (
    <hr
      style={{
        margin: '1rem 0',
        border: 'none',
        borderTop: '1px solid #e5e7eb',
      }}
    />
  );
}

/**
 * Card component for content grouping.
 */
export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps): React.ReactElement {
  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 ${className}`}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
      }}
    >
      {title && <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{title}</h3>}
      {children}
    </div>
  );
}

/**
 * Badge component for status indicators.
 */
export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps): React.ReactElement {
  const colors: Record<string, string> = {
    default: '#e5e7eb',
    success: '#d1fae5',
    warning: '#fef3c7',
    error: '#fee2e2',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: colors[variant],
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
      }}
    >
      {children}
    </span>
  );
}
