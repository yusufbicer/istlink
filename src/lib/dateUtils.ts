import { TFunction } from 'i18next';

// Month names for different locales
interface DateFormats {
  short: string;
  medium: string;
  long: string;
}

export const getLocalizedDate = (dateString: string, locale: string, t: TFunction): DateFormats => {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Month names in different languages
  const monthNames = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    tr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  };

  const fullMonthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
  };

  const currentLocale = locale as keyof typeof monthNames;
  const months = monthNames[currentLocale] || monthNames.en;
  const fullMonths = fullMonthNames[currentLocale] || fullMonthNames.en;

  const dateFormats = {
    short: `${months[month]} ${day}`,
    medium: `${months[month]} ${day}, ${year}`,
    long: `${fullMonths[month]} ${day}, ${year}`
  };

  return dateFormats;
};

export const formatBlogDate = (dateString: string, locale: string, t: TFunction, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const localizedDate = getLocalizedDate(dateString, locale, t);
  return localizedDate[format];
};