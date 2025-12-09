import * as z from 'zod';

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const colorsEnum = ["#FE6F6F", "#6FD0FE", "#736FFE", "#FE6FC2", "#4ADB42", "#FEAA6F"]

export const categorySchema = z.object({
    name: z.string().nonempty().max(50).trim().transform(capitalize),
    color: colorsEnum
});


