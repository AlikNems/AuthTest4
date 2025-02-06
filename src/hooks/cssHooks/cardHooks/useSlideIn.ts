import { useState, useEffect } from "react";

export function useSlideIn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Карточка появится сразу при загрузке
  }, []);

  return { isVisible };
}
