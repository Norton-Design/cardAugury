

export const manaImageGenerator = manaStr => {
    // console.log(manaStr)
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

            // console.log(`https://img.scryfall.com/symbology/${subStr}.svg`);

            results.append(img);
        } else {
            subStr = subStr + letter;
        }
    }

    return results;
}

