import fs from 'fs';

const defaultTexts = JSON.parse(fs.readFileSync('./resources/roleplay/shared/text/texts.json', 'utf8'));

export default class Texts {
    constructor() {
        this.file = defaultTexts;
    }

    /**
     * Translates the given key to a string using the stored translations.
     * @param {string} key - The key to translate.
     * @returns {string|null} The translated string, or null if the key is invalid or not found.
     */
    trans(key) {
        if (!key) return null;

        const searchKey = key[0];
        const translation = this.getText(searchKey);
        if (!translation) return null;

        const searchValue = key.splice(1, key.length - 1);
        let newString = this.processCustomStrings(translation, searchValue);
        if (searchValue.length > 0) {
            newString = this.processCustomValues(newString, searchValue);
        }

        return newString;
    }

    /**
     * Replaces custom strings in a given string with their corresponding values.
     * @param {string} string - The string to process.
     * @param {string} searchValue - The value to search for.
     * @returns {string|null} - The processed string, or null if the input string is null.
     */
    processCustomStrings(string, searchValue) {
        if (!string) return null;
        if (typeof string !== 'string') return string;

        const regex = /{([^{}]+)(?=[^{}]*})}/; // eslint-disable-line
        const matches = string.match(regex);
        if (!matches) return string;

        matches.forEach((match) => {
            const variable = match.replace('{', '').replace('}', '');
            const value = this.getText(variable);
            string = string.replace(match, value);
        });
        if (string.match(regex)) {
            return this.processCustomStrings(string, searchValue);
        }
        return string;
    }

    /**
     * Replaces placeholders in a string with custom values.
     * @param {string} string - The string to process.
     * @param {Array} values - An array of values to replace the placeholders with.
     * @returns {string|null} The processed string or null if the input string is null.
     */
    processCustomValues(string, values) {
        if (!string) return null;
        if (typeof string !== 'string') return string;

        const regex = /(%[a-z])/;

        const stringArray = string.split(regex);

        let valueIndex = 0;
        for (let i in stringArray) {
            if (stringArray[i].match(regex)) {
                stringArray[i] = stringArray[i].replace(stringArray[i], values[valueIndex]);
                valueIndex++;
            }
        }

        string = stringArray.join('');
        return string;
    }

    /**
     * Get the translation for the given key.
     * @param {string} key - The key to look up the translation for.
     * @returns {string|null} - The translation for the given key, or null if the key is falsy.
     */
    getText(key) {
        if (!key) return null;

        const keyArray = key.split('.');
        let translation = this.file;
        try {
            keyArray.forEach((key) => {
                translation = translation[key];
            });
        } catch (e) {
            // translation not found
        }

        if (!translation && this.translationTries === 0) {
            this.translationTries++;
            return this.getText(key, defaultTranslations);
        }
        this.translationTries = 0;
        return translation || 'Translation not found';
    }
}