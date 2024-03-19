class Converter{
    convert(num){
        return num

    }
}
class HexConverter extends Converter{
    convert(num) {
        return num.toString(16)
    }

}
class BinaryConverter extends Converter{
    convert(num) {
        return num.toString(2)
    }

}
class DecimalConverter extends Converter{
    convert(num) {
        return num
    }

}
class RomanConverter extends Converter{
    #basicRomanConstruction(number, gNumeral, mNumeral, base = '') {
        let numberInRoman = '';
        switch (number) {
            case 1:
                numberInRoman += base + mNumeral;
                break;
            case 2:
                numberInRoman += base + mNumeral.repeat(2);
                break;
            case 3:
                numberInRoman += base + mNumeral.repeat(3);
                break;
            case 4:
                numberInRoman += mNumeral + gNumeral;
                break;
            case 5:
                numberInRoman += gNumeral;
                break;

        }
        return numberInRoman;
    };
    #upToOneMillionInRoman(number) {
        if(number === 0){return 'NULLA'}
        let romanDigits = ['I', 'V', 'X', 'L', 'C', 'D', 'M', '\u0056\u0305', '\u0058\u0305', '\u004C\u0305', '\u0043\u0305', '\u0044\u0305', '\u004D\u0305']
        let varNumber = number;
        let numberInRoman = varNumber.toString().split('').reverse().map((item, index) => {
            let digit = Number(item);
            if (digit < 6) {
                return this.#basicRomanConstruction(digit, romanDigits[2 * index + 1], romanDigits[2 * index])
            } else if (isNaN(digit)) {
                return item
            } else {
                return this.#basicRomanConstruction(digit % 5, romanDigits[2 * index + 2], romanDigits[2 * index], romanDigits[2 * index + 1])
            }
        }).reverse().join('');

        return numberInRoman

    }
    convert(num) {
        return this.#upToOneMillionInRoman(num);
    }

}

export const converterFactory = {
    get(type){
        switch(type){
            case 'roman':
                return new RomanConverter()
                
            case 'binary':
                return new BinaryConverter()
                
            case 'hex':
                return  new HexConverter()
                
            default:
                return new DecimalConverter()
        }
}}

