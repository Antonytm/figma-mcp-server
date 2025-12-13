import { serializePage } from "serialization/serialize-page";
import { ToolResult } from "../tool-result";
import type { GetPagesParams } from "@shared/types";

export async function getPages(args: GetPagesParams): Promise<ToolResult> {
    await figma.loadAllPagesAsync();
    const pages = figma.root.findAllWithCriteria({
        types: ["PAGE"],
    });
    const serializedPages = pages.map((page) => serializePage(page as PageNode));
    return {
        isError: false,
        content: serializedPages,
    };
}