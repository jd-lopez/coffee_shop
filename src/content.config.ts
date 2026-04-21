import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const items = defineCollection({
  loader: file("src/data/items.json"),
  schema: z.object({
    title: z.string(),
    category: z.enum(["hot coffee", "iced coffee", "pastries", "brew gears"]),
    image: z.string().optional(),
    description: z.string(),
    price: z.number(),
  }),
});

export const collections = { items };
