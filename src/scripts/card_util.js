import { capitalize } from './card_generator';

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
    let collection = textStr.split("\n");

    collection.forEach(subStr => {
        const newListItem = document.createElement('li');
        newListItem.classList.add('oracle')
        newListItem.innerHTML = subStr;
        parentCon.append(newListItem);
    })
}

export const buildLegalities = (legalObj, legContainer) => {
    const relevantFormats = [
        'commander', 
        'standard', 
        'pioneer', 
        'modern', 
        'historic', 
        'pauper',
        'legacy',
        'vintage',
        'brawl',
        'penny'
    ]
    const innerContainer = document.createElement('dl')

    relevantFormats.forEach(formatStr => {
        const legalStatus = document.createElement('dd');
        legalStatus.classList.add('legal-status')

        const format = document.createElement('dt');
        format.innerHTML = capitalize(formatStr);
        format.classList.add('format-name');

        switch(legalObj[formatStr]){
            case 'legal':
                legalStatus.innerHTML = "LEGAL";
                legalStatus.classList.add('legal')
                break
            case 'not_legal':
                legalStatus.innerHTML = "NOT LEGAL";
                legalStatus.classList.add('not-legal')
                break
            case 'banned':
                legalStatus.innerHTML = "BANNED";
                legalStatus.classList.add('banned')
                break
            case 'restricted':
                legalStatus.innerHTML = "REST.";
                legalStatus.classList.add('rest')
                break
        }

        innerContainer.append(format);
        innerContainer.append(legalStatus);
    })

    legContainer.append(innerContainer)
}
