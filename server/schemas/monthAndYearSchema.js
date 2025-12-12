import * as z from 'zod';

export const monthAndYearSchema = z.object({
    month: z.preprocess(val => {
        if (val === "" || val === undefined || val === null) {
            return undefined
        }
        return parseInt(val)
    },
        z.number().gte(0).lte(11).optional()),
    year: z.preprocess(val => {
        if (val === "" || val === undefined || val === null) {
            return undefined
        }
        return parseInt(val)
    },
        z.number().gte(1900).lte(2050).optional())
})