import { useContext } from "react";
import { __RouterContext, RouteComponentProps, StaticContext } from "react-router";

export function useRouter<T extends { [K in keyof T]?: string | undefined } = {}>() {
  return useContext(__RouterContext as unknown as React.Context<RouteComponentProps<T, StaticContext, any>>);
}
