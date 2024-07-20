import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const useDurationFormat = (seconds: number) => {
    const duration = dayjs.duration(seconds, 'seconds');
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();

    let formattedTime = '';
    
    if (hours > 0) {
        formattedTime += hours === 1 
        ? `${hours} hour ` 
        : `${hours} hours `;
    }
    if (minutes > 0) {
        formattedTime += minutes === 1 
        ? `${minutes} minute ` 
        : `${minutes} minutes `;
    }
    formattedTime += remainingSeconds === 1 
    ? `${remainingSeconds} second` 
    : `${remainingSeconds} seconds`;
    
    return formattedTime.trim();
}