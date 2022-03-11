export function deepClean(str: string): string {
    let newStr = "";
    const noDiacriticsString = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const ALLOWED_CHARACTERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    noDiacriticsString.split("").forEach(character => {

        if (!(ALLOWED_CHARACTERS.includes(character.toLowerCase()))) {
            newStr += "-";
        } else {
            newStr += character;
        }

    });
    newStr = newStr.replace(/[-,]+/g, '-');
    if (newStr[0] === "-") {
        newStr = newStr.substring(1, newStr.length - 1);
        if (newStr.length === 1) return "";
    };
    if (newStr[newStr.length - 1] === "-") {
        newStr = newStr.substring(0, newStr.length - 1);
        // if (newStr.length === 1) return "";
    }
    return newStr;
}