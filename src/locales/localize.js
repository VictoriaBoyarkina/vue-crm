import ru from "../locales/ru.json";
import en from "../locales/en.json";
import store from "../store";

const locales = {
  "ru-Ru": ru,
  "en-Us": en,
};

export default function (key) {
  const locale = store.getters.info.locale || "ru-Ru";
  const lang = locales[locale];
  return lang[key] || `[Localize error]: key ${key} not found`;
}
