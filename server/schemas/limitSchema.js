import * as z from 'zod';

export const limitSchema = z.object({
    value: z.preprocess(val => parseInt(val), z.number().gt(0).lte(1000000)),
    category_id: z.string().nonempty().trim(),
    month: z.preprocess(val=>parseInt(val), z.number().gte(0).lte(11)),
    year: z.preprocess(val => parseInt(val), z.number().gte(1900).lte(2050))
});