import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Goal-based colors
        goals: {
          'weight-loss': "hsl(var(--weight-loss))",
          'weight-loss-foreground': "hsl(var(--weight-loss-foreground))",
          'muscle-building': "hsl(var(--muscle-building))",
          'muscle-building-foreground': "hsl(var(--muscle-building-foreground))",
          'healthy-living': "hsl(var(--healthy-living))",
          'healthy-living-foreground': "hsl(var(--healthy-living-foreground))",
          'quick-meals': "hsl(var(--quick-meals))",
          'quick-meals-foreground': "hsl(var(--quick-meals-foreground))",
          'family-cooking': "hsl(var(--family-cooking))",
          'family-cooking-foreground': "hsl(var(--family-cooking-foreground))",
        },
        // Food category colors
        food: {
          vegetables: "hsl(var(--vegetables))",
          proteins: "hsl(var(--proteins))",
          grains: "hsl(var(--grains))",
          dairy: "hsl(var(--dairy))",
          spices: "hsl(var(--spices))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-weight-loss': 'var(--gradient-weight-loss)',
        'gradient-muscle-building': 'var(--gradient-muscle-building)',
        'gradient-healthy-living': 'var(--gradient-healthy-living)',
        'gradient-quick-meals': 'var(--gradient-quick-meals)',
        'gradient-family-cooking': 'var(--gradient-family-cooking)',
      },
      boxShadow: {
        'elegant': 'var(--shadow-elegant)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
