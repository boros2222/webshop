
export const dateTimeToString = (date) => {
    return `${date.year}.${dateNumberToString(date.monthValue)}.${dateNumberToString(date.dayOfMonth)}. ${dateNumberToString(date.hour)}:${dateNumberToString(date.minute)}`
};

const dateNumberToString = (dateNumber) => {
    return `${dateNumber < 10 ? '0' : ''}${dateNumber}`;
};
