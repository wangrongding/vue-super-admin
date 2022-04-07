module.exports = {
  defaultSeverity: "error",
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "max-empty-lines": 1,
  },
};
