import React from "react";
import { IconSvg, IconDefinition } from "./Icon.generated";
export * from "./Icon.generated";

interface Props {
  icon?: IconDefinition;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  spin?: boolean;
  onClick?: () => void;
}

export function Icon(props: Props) {
  if (!props.icon || !IconSvg[props.icon]) {
    return null;
  }

  const icon = React.cloneElement(IconSvg[props.icon], {
    style: props.style,
    onClick: props.onClick,
    className: props.className,
    ...(props.alt
      ? {
          children: [<title key="title">{props.alt}</title>, IconSvg[props.icon].props.children],
        }
      : {}),
  });

  return icon;
}
