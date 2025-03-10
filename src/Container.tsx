import { PropsWithChildren } from "react";
interface ContainerProps extends PropsWithChildren {
  children: React.ReactElement;
}
const Container = ({ children }: ContainerProps) => {
  return <div className="md:mx-32">{children}</div>;
};
export default Container;
