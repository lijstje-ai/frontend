export const useScrollToElement = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    scrollToElement,
  };
};
