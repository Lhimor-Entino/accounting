export const getDateTime = () => {
  const currentDate: Date = new Date();

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  
  const formattedDateTime: string = currentDate.toLocaleString('en-US', options).replace(',', ' at');

  
  return formattedDateTime // Example output: "Friday, February 10, 2023 at 5:57 PM"

}