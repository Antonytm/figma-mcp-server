import { Color } from "@shared/types";
import { ColorHex } from "@shared/types/params/shared/color-hex";
import { convertToRGBA } from "./color-conversion";

export function getSolidColorPaint(color: Color): SolidPaint {
    return {
        type: 'SOLID',
        color: {
            r: color.r,
            g: color.g,
            b: color.b,
        },
        opacity: color.a || 1,
    } as SolidPaint;
}

export function getSolidHEXColorPaint(color: ColorHex): SolidPaint {
    const rgba = convertToRGBA(color);
    return getSolidColorPaint(rgba);
}