import { Color } from "@shared/types";
import { ColorHex } from "@shared/types/params/shared/color-hex";

export function convertToRGBA(color: ColorHex): Color {
    const match = color.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
    let [r, g, b, a] = ['00', '00', '00', 'FF'];
    if(match){
        [r,g,b,a] = match.slice(1);
    }
    return {
        r: parseInt(r, 16) / 255,
        g: parseInt(g, 16) / 255,
        b: parseInt(b, 16) / 255,
        a: parseInt(a, 16) / 255,
    };
}

export function convertToHex(color: Color): ColorHex {
    const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
    const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
    const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
    const a = color.a ? Math.round(color.a * 255).toString(16).padStart(2, '0') : 'FF';
    return `#${r}${g}${b}${a}`;
}