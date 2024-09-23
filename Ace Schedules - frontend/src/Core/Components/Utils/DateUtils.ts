export const formatDateForMySQL = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
};

export const parseDate = (dateStr: string | undefined): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split(/[\s/:]+/);
    if (parts.length !== 6) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);
    const second = parseInt(parts[5], 10);
    
    return new Date(year, month, day, hour, minute, second);
};

export const parseDateString = (dateStr: string): Date | null => {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{1,2})$/;
    const match = dateStr.match(regex);
  
    if (!match) return null;
  
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);
    const hour = parseInt(match[4], 10);
    const minute = parseInt(match[5], 10);
  
    return new Date(year, month, day, hour, minute);
  };
  