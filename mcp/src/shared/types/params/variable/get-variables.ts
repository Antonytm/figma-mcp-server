import { z } from "zod";

export const GetVariablesParamsSchema = z.object({});

export type GetVariablesParams = z.infer<typeof GetVariablesParamsSchema>;
