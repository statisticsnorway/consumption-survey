import { useEffect } from 'react';

const useClickOutsideDetector = (ref, callback) => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(event.target)) {
          callback();
      }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);
};

export default useClickOutsideDetector;
