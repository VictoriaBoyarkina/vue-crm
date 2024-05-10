import "materialize-css/dist/css/materialize.min.css"; // Import Materialize CSS
import M from "materialize-css"; // Import Materialize JavaScript

const MaterializePlugin = {
  install(app) {
    app.config.globalProperties.$M = M;
  },
};

export default MaterializePlugin;
