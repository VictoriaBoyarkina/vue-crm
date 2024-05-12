import store from "../store";

export default {
  install: (app) => {
    app.config.globalProperties.$normalizeDate = (options, date) => {
      const locale = store.getters.info.locale || "ru-Ru";
      const data = new Date(Date.parse(date));
      return new Intl.DateTimeFormat(locale, options).format(data);
    };
  },
};
