export const currency = (code: number) => {
    switch (code) {
        case 980:
            return '₴';
        case 840:
            return '$';
        case 978:
            return '€';
        case 933:
            return 'BEL';
        case 643:
            return '₽';
        case 498:
            return 'MDL';
        default:
            return `[${code.toString()}]`;
    }
};

export const toPrice = (amount: number) => (amount / 100).toFixed(2);
