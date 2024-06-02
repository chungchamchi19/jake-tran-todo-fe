import { useEffect, useRef, useState } from "react";

export const useValidateTask = (task: { title: string }) => {
  const [isInvalidTitle, setIsInvalidTitle] = useState<boolean>(false);
  const mounted = useRef<boolean>(false);

  const validateTitle = (value: string) => {
    setIsInvalidTitle(!value);
  };

  useEffect(() => {
    if (mounted.current) {
      validateTitle(task.title);
      return;
    }
    mounted.current = true;
  }, [task.title]);

  return {
    isInvalidTitle,
  };
};
