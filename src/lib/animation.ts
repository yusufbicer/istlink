
/**
 * Utility functions for animations
 */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export const slideUp = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: -10, opacity: 0, transition: { duration: 0.3 } }
};

export const slideDown = {
  initial: { y: -10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: 10, opacity: 0, transition: { duration: 0.3 } }
};

export const slideRight = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: 10, opacity: 0, transition: { duration: 0.3 } }
};

export const slideLeft = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -10, opacity: 0, transition: { duration: 0.3 } }
};

export const scaleIn = {
  initial: { scale: 0.98, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.98, opacity: 0, transition: { duration: 0.3 } }
};

/**
 * Custom hooks for animations
 */
export const staggerChildren = (staggerTime = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerTime
    }
  }
});

/**
 * Animation variants for lists
 */
export const listItemVariant = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.3 } }
};

/**
 * Animation variants for cards
 */
export const cardVariant = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
  exit: { y: 10, opacity: 0, transition: { duration: 0.2 } },
  whileHover: { y: -5, transition: { duration: 0.2 } }
};

/**
 * Animation variants for buttons
 */
export const buttonVariant = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } }
};
