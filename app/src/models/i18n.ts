import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n to React
  .init({
    resources: {
      // English
      en: {
        translation: {
          welcome: "Welcome to the Flavor Lab",
          username: "username:",
          password: "password:",
          login:"Login",
          guest: "Continue as Guest",
          signup: "Sign Up"
        },
      },
      // Spanish
      es: {
        translation: {
          welcome: "Bienvenido al Laboratorio de Sabores",
          username: "nombre de usuario:",
          password: "contraseña:",
          login:"Acceso",
          guest: "Continuar como invitado",
          signup: "Inscribirse"
        },
      },
    },
    fallbackLng: 'en', // Default language if the user's language isn't available
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;