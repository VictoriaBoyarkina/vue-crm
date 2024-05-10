import M from "materialize-css"; // Import Materialize JavaScript

export default {
  mounted(el, { value }) {
    M.Tooltip.init(el, {
      html: value.value,
      position: value.position ? value.position : "bottom",
    });
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
