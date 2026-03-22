import React from "react";

function dynamic(loader: () => Promise<any>, options?: any) {
  const Component = React.lazy(loader);
  const DynamicComponent = (props: any) => (
    <React.Suspense fallback={options?.loading?.() || null}>
      <Component {...props} />
    </React.Suspense>
  );
  return DynamicComponent;
}

export default dynamic;
