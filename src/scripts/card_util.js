

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
    // console.log(textStr);

    let testArr = textStr.split("\n");
    console.log(testArr.length)

    for (let i = 0; i < textStr.length; i++){
        const char = textStr[i];
        // console.log(char);

        if (char === '↵'){
            collection.push(subStr);
            // console.log(subStr);

            subStr = '';
        } else {
            subStr += char;
        }
    }

    collection.push(subStr);

    collection.forEach(subStr => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = subStr;
        parentCon.append(newListItem);
    })
}

