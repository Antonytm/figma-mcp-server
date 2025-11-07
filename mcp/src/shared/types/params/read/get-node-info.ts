import { z } from "zod";

export const GetNodeInfoParamsSchema = z.object({
    id: z.string(),
});

export type GetNodeInfoParams = z.infer<typeof GetNodeInfoParamsSchema>;