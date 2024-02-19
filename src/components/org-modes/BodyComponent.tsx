import { ReactNode } from "react";

export default function BodyComponent(child: ReactNode) {
  return <div className="w-[100vw] m-auto bg-transparent">{child}</div>;
}
