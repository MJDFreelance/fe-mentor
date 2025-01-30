export const formatDecimalAsDollars = (
    value: number,
    settings?: { hasCommas?: boolean; integerOnly?: boolean }
): string => {
    const hasCommas = settings?.hasCommas ?? false;
    const integerOnly = settings?.integerOnly ?? false;

    if (hasCommas) return formatDecimalAsDollarsWithCommas(value, integerOnly);

    if(!value) return ''

    const formattedValue = integerOnly ? Math.floor(value)?.toFixed(0) : value?.toFixed(2);
    return `$${formattedValue}`;
};

export const formatDecimalAsDollarsWithCommas = (value: number, integerOnly?: boolean): string => {
    const fixedValue = value.toFixed(integerOnly ? 0 : 2);
    return `$${fixedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const getRandomLetterString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomNumberString = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}