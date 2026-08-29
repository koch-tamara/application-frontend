
export function createDate(date: string, dateFormat?: string): Date {
    const defaultFormat = 'de';
    let format = dateFormat ?? defaultFormat;

    format = format.toLowerCase();
    if (format != defaultFormat) {
        return new Date(date);
    }

    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
};