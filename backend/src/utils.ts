export function random(len: number) {
    const options = "fvpibjgibjgbji034059049fijigbjgjblo";
    let length = options.length;
    let result = '';
    for (let i = 0; i < len; i++) {
        result += options[(Math.floor(Math.random() * length))];
    }
    return result;
}