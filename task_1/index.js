import {encoded, translations} from './data.js'

console.log("Let's rock")

const uniqueIds = new Set();
const repeatedIds = {};

function decodeFields(encoded, translations) {
    const decoded = [];

    encoded.forEach(item => {
        const decodedItem = {groupId: item.groupId};

        for (const key in item) {
            if (key === 'groupId' || key === 'service' || key === 'formatSize' || key === 'ca') {
                decodedItem[key] = item[key];
            } else {
                const translation = translations[item[key]];

                if (translation !== undefined) {
                    decodedItem[key] = translation;
                } else {
                    decodedItem[key] = item[key];
                }

                if (repeatedIds[item[key]]) {
                    repeatedIds[item[key]]++;
                } else {
                    repeatedIds[item[key]] = 1;
                }

                uniqueIds.add(item[key]);
            }
        }
        decoded.push(decodedItem);
    });

    return decoded;
}

const decodedFields = decodeFields(encoded, translations);
const uniqueIdsArray = Array.from(uniqueIds).filter(id => repeatedIds[id] === 1);
console.log(decodedFields, uniqueIdsArray);
