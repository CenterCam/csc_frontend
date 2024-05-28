export const proxy = "https://api.hongnnureach.info";
// export const proxy = "http://127.0.0.1:8000";



export const convertDateToLaravelFormat = (dateString) => {
    // Create a Date object from the string
    const date = new Date(dateString);
    
    // Get year, month (0-indexed), and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  
    // Format the date string
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }

  export const convertLaravelFormatToDate = (formattedDateString) => {
    const dateObject = new Date(formattedDateString);
    const options = {
      timeZone: 'Asia/Bangkok', // GMT+0700 (Indochina Time)
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    
    const formattedDate = dateObject.toLocaleString('en-US', options);
    return formattedDate;
  };
  