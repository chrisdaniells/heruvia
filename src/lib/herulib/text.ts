export function getReducedPrefaceText(preface: string, limit: number) {
    let text = '';
    const div = document.createElement('div');
    div.innerHTML = preface;
    const paragraphs = div.getElementsByTagName('p');
    for (let p of paragraphs) {
        const trimmed = p.innerText.trim();
        if (trimmed.length) {
            text = text + p.innerText + (trimmed[trimmed.length-1] !== '.' ? '.' : '') + ' ';
        }
    }
    text = text.substr(0,limit-1) + (text.length > limit ? '...' : '');

    return text;
}