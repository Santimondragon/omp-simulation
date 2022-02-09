const formatNumber = (num, unit = "$") => {
  if (unit === "%")
    return Number.parseFloat(num).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
  return Number.parseFloat(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
};

export default formatNumber;
