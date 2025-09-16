export const getStylerestent = (nbr: number) => {
  if (nbr > 100) {
    return {
      color: "text-green-600",
      message: "Nombreuses places",
    };
  }
  if (nbr > 0) {
    return {
      color: "text-yellow-600",
      message: "Peu de places",
    };
  }
  return {
    color: "text-red-600",
    message: "Complet",
  };
};
