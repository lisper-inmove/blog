import "./style.css";

export default function TransformDemoPage() {
  return (
    <>
      <div className="flex mt-10 items-center h-[50vh] w-[50vw] justify-center">
        <div className="cube">
          <div className="side bg-red-500 left-side"></div>
          <div className="side bg-green-500 right-side"></div>
          <div className="side bg-blue-500 top-side"></div>
          <div className="side bg-gray-500 bottom-side"></div>
          <div className="side bg-orange-500 front-side"></div>
          <div className="side bg-cyan-500 back-side"></div>
        </div>
      </div>

      {/*
      <div className="flex items-center h-[50vh] w-[50vw] justify-center">
        <div className="cube2">
          <div className="side2 bg-red-500 w-32 h-32 left-side2">test1</div>
        </div>
      </div>
      */}
    </>
  );
}
