import cs from "classnames";

interface Props {
  condition?: boolean;
  children: React.ReactNode;
  className?: string;
}
export const NoDataBoundary = (props: Props) => {
  if (!props.condition)
    return (
      <div className={cs("flex items-center justify-center gap-5 text-xl font-bold", props.className)}>
        {/* <Icon icon="information" className="w-12 h-12 text-primary" /> */}
        No results found
      </div>
    );

  return <>{props.children}</>;
};
