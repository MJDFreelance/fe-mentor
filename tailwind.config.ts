import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        full: "100% 100%",
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          hover: "hsl(var(--background-hover))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          heading: "hsl(var(--foreground-heading))",
          hover: "hsl(var(--foreground-hover))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        barlowCondensed: ["BarlowCondensed", "sans-serif"],
        bigShoulders: ["BigShoulders", "sans-serif"],
        commissioner: ["Commissioner", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
        fraunces: ["Fraunces", "serif"],
        inconsolata: ["Inconsolata", "monospace"],
        inter: ["Inter", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        kumbhSans: ["KumbhSans", "sans-serif"],
        leagueSpartan: ["LeagueSpartan", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        lora: ["Lora", "serif"],
        manrope: ["Manrope", "sans-serif"],
        martianMono: ["MartianMono", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
        mouseMemoirs: ["MouseMemoirs", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        publicSans: ["PublicSans", "sans-serif"],
        redHat: ["RedHat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        robotSlab: ["RobotSlab", "serif"],
        spaceGrotesk: ["SpaceGrotesk", "sans-serif"],
        spaceMono: ["SpaceMono", "monospace"],
        workSans: ["WorkSans", "sans-serif"],
      },
      spacing: {
        "15": "3.75rem",
        "18": "4.5rem",
        "19": "4.75rem",
        "23": "5.75rem",
        "25": "6.25rem",
        "30": "7.5rem",
        "60": "15rem",
        "77": "19.25rem",
        "94": "23.5rem",
        "140": "35rem",
        "158": "39.5rem",
        "10ch": "10ch",
        "20ch": "20ch",
        "30ch": "30ch",
        "40ch": "40ch",
        "45ch": "45ch",
        "50ch": "50ch",
        "105ch": "105ch",
        "1/3": "33.333333%",
        "1/2": "50%",
        "3/4": "75%",
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "7.5": "1.875rem",
        "11.5": "2.875rem",
        "13.5": "3.375rem",
        "17.5": "4.375rem",
        "82.5": "20.625rem",
        "page-padding": "var(--page-padding)",
        "page-width": "var(--page-width)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "var(--card-radius)",
        halfcard: "calc(var(--card) / 2)",
        bigsection: "calc(var(--card) * 3)",
        section: "calc(var(--section-radius) * 2)",
      },
      transitionProperty: {
        width: "width",
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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          "grid-areas": (value) => ({
            gridTemplateAreas: value
              .split("|") // Split rows by '|'
              .map((row) => `"${row}"`) // Wrap rows in quotes
              .join(" "), // Join rows with spaces
          }),
        },
        {
          values: {
            "float-image": "img header|img text",
          },
        }, // Allow arbitrary values
      );
    }),

    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          "grid-area": (value) => ({
            gridArea: value,
          }),
        },
        { values: {} }, // Allow arbitrary values
      );
    }),
  ],
} satisfies Config;
