const theme = {
  spacing: (num) => `${num * 4}px`,
  fontSize: {
    xSmall: "10px",
    small: "12px",
    medium: "15px",
    large: "18px",
    xLarge: "24px",
  },
  pallete: {
    red: "#FF0000",
    blue: "#106FDF",
    white: "#FFFFFF",
    darkBlue: "#203147",
    darkGray: "#5F666C",
    gray: {
      1: "#F8F9FD",
      2: "#EFF3F6",
      // 2: "#203147",
      3: "#EAEEF2",
      4: "#D9DFE5",
    },
  },
  shadows: {
    filterItem: "0 2px 2px #00000055",
    item: "0 4px 8px -4px #00000077",
    container: "0 4px 12px -8px #00000088",
  },
};

export default theme;
