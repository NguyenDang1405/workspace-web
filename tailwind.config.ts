import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Design System Specification Tokens (UI_DESIGN_SYSTEM_AND_SPECS.md)
        'surface-canvas': '#F8FAFC',
        'surface-sidebar': '#F1F5F9',
        'surface-card': '#FFFFFF',
        'surface-border': '#E2E8F0',
        'surface-border-active': '#CBD5E1',

        'ink-primary': '#0F172A',
        'ink-body': '#334155',
        'ink-muted': '#64748B',

        'brand-indigo': '#4F46E5',
        'brand-cyan': '#06B6D4',
        'brand-crimson': '#BE123C',
        'brand-crimson-bg': '#FFF1F2',
        'brand-teal': '#0D9488',

        // System Aliases
        workspace: '#F8FAFC',
        sidebar: {
          DEFAULT: '#F1F5F9',
          border: '#CBD5E1',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A',
        },
        topbar: '#FFFFFF',
        border: '#E2E8F0',
        input: '#E2E8F0',
        ring: '#4F46E5',

        'text-main': '#0F172A',
        'text-secondary': '#64748B',

        primary: {
          DEFAULT: '#4F46E5', // Royal Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
          foreground: '#FFFFFF',
        },
        crimson: {
          DEFAULT: '#BE123C', // Rose Crimson (CPM / Alert)
          hover: '#9F1239',
          light: '#FFF1F2',
          border: '#FECDD3',
        },
        teal: {
          DEFAULT: '#0D9488', // Success / Availability
          light: '#F0FDFA',
        },
        cyan: {
          DEFAULT: '#06B6D4', // Electric Cyan
          light: '#ECFEFF',
        },

        background: '#F8FAFC',
        foreground: '#0F172A',
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B',
        },
      },
      borderRadius: {
        lg: '8px', // Cards, panels, tables, modals (Modern B2B SaaS)
        md: '6px', // Buttons, inputs, dropdowns, badges, active sidebar items
        sm: '4px', // Status chips, compact tags
        '3xl': '24px', // Auth split-screen container
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.04)',
        auth: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
