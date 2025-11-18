import { z } from "zod";

export const SetComponentPropertiesParamsSchema = z.object({
    id: z.string().describe("Node id"),
    //
    properties: z.record(z.string(), z.any()).describe("Properties"),
});