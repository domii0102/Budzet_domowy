import * as z from 'zod';

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const colorsEnum = z.enum(["#fe6f6f", "#6fd0fe", "#736ffe", "#fe6fc2", "#4adb42", "#feaa6f"])

export const categorySchema = z.object({
    name: z.string().nonempty().max(50).trim().transform(capitalize),
    color: colorsEnum
});


