export function getFontStyle(fontWeight: number): string {
    switch (fontWeight) {
        case 100:
            return "Thin";
        case 200:
            return "Extra Light";
        case 300:
            return "Light";
        case 400:
            return "Regular";
        case 500:
            return "Medium";
        case 600:
            return "Semi Bold";
        case 700:
            return "Bold";
        case 800:
            return "Extra Bold";
        case 900:
            return "Black";
        default:
            return "Regular";
    }
}
