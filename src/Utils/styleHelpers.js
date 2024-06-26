export const renderStatusColor = (value) => {
  switch (value) {
    case "ACTIVE":
      return "#67A13E";

    case "INACTIVE":
      return "#EA5046";

    case "DRAFT":
      return "#8F6A97";

    case "ARCHIVE":
      return "#EA5046";

    default:
      break;
  }
};

export const renderOrderStatusColor = (value) => {
  switch (value) {
    case "DELIVERED":
      return "#67A13E";

    case "PENDING":
      return "#8F6A97";

    case "CANCELED":
      return "#EA5046";

    case "SHIPPED":
      return "#2ABC1E";

    case "RETURNED":
      return "#D45F0B";

    default:
      break;
  }
};
