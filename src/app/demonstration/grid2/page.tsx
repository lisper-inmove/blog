export default function GridDemoPage() {
  let styles = {
    width: "100px",
    height: "100px",
    margin: "5px",
    border: "1px solid black",
  };

  let styles1 = {
    margin: "5px",
    border: "1px solid black",
    gridArea: "d",
  };

  let styles2 = {
    width: "100px",
    height: "100px",
    margin: "5px",
    border: "1px solid black",
    gridArea: "g",
  };

  let grid1 = {
    display: "grid",
    border: "3px solid #FFFF00",
    gridTemplateAreas: "'a b c' 'd d e' 'f g g'",
  };

  return (
    <>
      <div
        style={grid1}
        className="w-1/2 h-1/2 border border-spacing-10 justify-center content-center"
      >
        <div style={styles1} className="bg-green-800">
          <h2>Demo 1</h2>
          <div></div>
        </div>
        <div style={styles2} className="bg-yellow-800">
          <h2>Demo 2</h2>
          <div></div>
        </div>
        <div style={styles} className="bg-orange-800">
          <h2>Demo 3</h2>
          <div></div>
        </div>
        <div style={styles} className="bg-blue-800">
          <h2>Demo 4</h2>
          <div></div>
        </div>
        <div style={styles} className="bg-stone-800">
          <h2>Demo 5</h2>
          <div></div>
        </div>
        <div style={styles} className="bg-pink-800">
          <h2>Demo 6</h2>
          <div></div>
        </div>
      </div>
    </>
  );
}
