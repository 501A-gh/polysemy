export const getRowIntent = (firstWord: string) => {
  let type = "p";
  switch (firstWord) {
    case "#":
      type = "h1";
      break;
    case "##":
      type = "h2";
      break;
    case "###":
      type = "h3";
      break;
    case "####":
      type = "h4";
      break;
    case "#####":
      type = "h5";
      break;
    case "######":
      type = "h5";
      break;
    case ">":
      type = "quote";
    case "-":
      type = "quote";
  }
  return type;
};
