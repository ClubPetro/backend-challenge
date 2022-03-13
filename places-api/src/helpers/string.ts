/**
* @param {string} str - the string to clean
* @returns {string} - the string without diacritics, with hyphens as spaces, and only one space per word.
*/
export function deepClean(str: string): string {
    /**
     * removes diacritics from a string. ãó => ao
     * for every letter of the string, if the letter in lowercase is not alphanumeric,
     * replace it with '-' (hyphen) only once until a new alphanumeric character is found.
    */
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