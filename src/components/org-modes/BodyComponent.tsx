interface BodyComponentProps {
  params: {
    components: any[];
  };
}

export default function BodyComponent({ params }: BodyComponentProps) {
  return <div className="w-[100vw] text-2xl">{params.components}</div>;
}
