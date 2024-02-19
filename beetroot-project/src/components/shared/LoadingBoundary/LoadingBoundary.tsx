import React from "react";

interface Props {
  loading: boolean;
  children: React.ReactNode;
  placeholder?: JSX.Element;
}

export const LoadingBoundary = (props: Props) => {
  if (!props.loading) {
    return <>{props.children}</>;
  }

  return props.placeholder ? props.placeholder : <p>Loading</p>;
};
