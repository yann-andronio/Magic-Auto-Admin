export const getStylerestent = (nbr: number) => {
  if (nbr > 100) {
    return {
      color: "text-green-700",
      message: "Nombreuses places",
    };
  }
  if (nbr > 0) {
    return {
      color: "text-orange-600",
      message: "Peu de places",
    };
  }
  return {
    color: "text-red-700",
    message: "Complet",
  };
};
