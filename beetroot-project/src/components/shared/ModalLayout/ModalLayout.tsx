interface Props {
  children?: React.ReactNode;
  title: string;
}

const ModalLayout = (props: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg lg:text-4xl font-bold whitespace-nowrap mb-14 mt-1 w-max">{props.title}</h1>
      {props.children}
    </div>
  );
};
export default ModalLayout;
