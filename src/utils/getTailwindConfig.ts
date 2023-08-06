const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.\d+?)0+$/, "$1")
    .replace(/\.0$/, "");
const em = (px, base) => `${round(px / base)}em`;

export default function getTailwindConfig(content: string[]) {
  content.push("node_modules/lorga-ui/dist/es.js");

  return {
    content: content,
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          formcolor: "#003c4d",
          blue: {
            50: "#eff9fb",
            100: "#d0e7ed",
            200: "#aad0db",
            300: "#8abbc9",
            400: "#6ca7b7",
            500: "#428193",
            600: "#275f6f",
            700: "#153f4b",
            800: "#0a2027",
            900: "#010203",
          },
        },
        // eslint-disable-next-line
        typography: (theme: any) => ({
          DEFAULT: {
            css: {
              table: {},
              thead: {
                border: "none",
              },
              tr: {
                border: "none",
              },
              "tr:last-child": {
                borderBottomWidth: "0",
              },
              th: {
                verticalAlign: "bottom",
                borderWidth: "2px",
                borderColor: theme("colors.gray[400]"),
                backgroundColor: theme("colors.gray[200]"),
                padding: "4px 8px",
              },
              "th > p, td > p": {
                margin: 0,
              },
              td: {
                verticalAlign: "top",
                borderWidth: "2px",
                borderColor: theme("colors.gray[300]"),
                backgroundColor: theme("colors.gray[100]"),
              },
              "tbody td:first-child": {
                paddingLeft: em(8, 14),
              },
            },
          },
        }),
      },
    },
    plugins: [require("@tailwindcss/typography")],
  };
}
