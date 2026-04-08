// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { fontProviders } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "PlusJakarta",
      cssVariable: "--font-jakarta",
      weights: [200, "400", "bold"],
    },
  ],

  integrations: [icon()],
});
