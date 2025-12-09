import * as z from 'zod';

export const transactionSchema = z.object({
    name: z.string().max(50).nonempty().trim(),
    value: z.preprocess(val => parseInt(val), z.number().gt(0).lte(1000000)),
    date: z.preprocess(val => {
        const date = new Date(val);
        return isNaN(date) ? undefined : date;
    }, z.date().max(new Date())),
    category_id: z.string().nonempty().trim(),
    description: z.string().max(300)
});