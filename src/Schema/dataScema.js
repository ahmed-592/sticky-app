import * as zod from 'zod'

export const schema = zod.object({
    title: zod.string().nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long"),
    content: zod.string().nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long"),

})





