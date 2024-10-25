import { format } from "date-fns"

export default function change(date: string, cond: boolean): string {
    if (cond) {
        const formattedDate = format(date, 'dd-MMM yyyy');
        return (formattedDate);
    } else {
        const day = parseInt(format(date, 'd')); // Day of the month without leading zero
        const month = format(date, 'MMMM'); // Full month name
        const year = format(date, 'yyyy'); // Year

        // Format day with suffix
        const dayWithSuffix = `${day}${getDaySuffix(day)}`;

        // Combine into desired format
        const formattedDate = `${dayWithSuffix} ${month} ${year}`;
        return formattedDate
    }
}

function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}