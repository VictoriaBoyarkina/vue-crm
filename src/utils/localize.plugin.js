import localize from "@/locales/localize";

export default {
  install: (app) => {
    app.config.globalProperties.$translate = (key) => {
      return localize(key);
    };
  },
};
