import React, { Suspense } from "react";

const MotionDiv = React.lazy(async () => {
  const mod = await import("framer-motion");
  // Return a simple wrapper component that renders motion.div
  return {
    default: ({ children, ...props }: any) => React.createElement(mod.motion.div, props, children),
  };
});

export default function LazyMotion(props: any) {
  return (
    <Suspense fallback={<div {...props} /> }>
      <MotionDiv {...props} />
    </Suspense>
  );
}
