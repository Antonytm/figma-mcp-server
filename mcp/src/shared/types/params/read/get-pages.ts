import { z } from "zod";

export const GetPagesParamsSchema = z.object({
});

export type GetPagesParams = z.infer<typeof GetPagesParamsSchema>;