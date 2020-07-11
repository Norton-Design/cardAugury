

export const manaImageGenerator = manaStr => {
    let results = document.createElement('div');
    results.classList.add("mana-symbol-container");

    if (!manaStr) return results;

    let subStr = '';

    for (let i = 0; i < manaStr.length; i++){
        const letter = manaStr[i];

        if (letter === '{'){
            subStr = '';
        } else if (letter === '}'){
            const img = document.createElement("img");
            img.setAttribute("src", `https://img.scryfall.com/symbology/${subStr}.svg`);

            results.append(img);
        } else {
            subStr = subStr + letter;
        }
    }

    return results;
}

export const oracleTextHandler = (textStr, parentCon) => {
    const collection = [];
    let subStr = '';

    for (let i = 0; i < textStr.length; i++){
        const char = textStr[i];

        if (char === '↵'){
            const newListItem = document.createElement('li')
            newListItem.innerHTML = subStr;
            collection.push(newListItem);

            subStr = '';
        } else {
            subStr += char;
        }
    }

    collection.forEach(ele => {
        parentCon.append(ele)
    })
}

