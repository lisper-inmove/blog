export default function GridDemoPage() {
  let styles = {
    margin: "5px",
    border: "1px solid black",
  };

  let styles1 = {
    margin: "5px",
    border: "1px solid black",

    // think that our grid is 4x4
    // thus we have 5x5 border for our grid, the number of grid border is based on 1.
    // -1 means last border
    /**
     * column x row = 4 x 4
     * border = 5 x 5(1~5)
     *       1 2 3 4
     *      +-------+
     * 1    | | | | |
     *      +-------+
     * 2    | | | | |
     *      +-------+
     * 3    | | | | |
     *      +-------+
     * 4    | | | | |
     *      +-------+
     * */
    // a box has four border
    // columnStart: left-border
    // columnEnd: right-border
    // rowStart: top-border
    // rowEnd: bottom-border
    // in general, we can only set a pair of start-end
    // gridColumnStart: 2,
    // gridColumnEnd: 4,
    // gridRowStart: 2,
    // gridRowEnd: 4,

    // take two columns
    gridColumn: "span 2",
  };

  let grid1 = {
    display: "grid",
    // gridRowGap and gridColumnGap
    // gap: "1rem",
    border: "3px solid #FFFF00",
    // number, percentage, fr
    // gridTemplateColumns: "1fr 2fr 1fr",
    // gridTemplateColumns: "repeat(3, 1fr)", // 3 is column count
    // gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",

    gridTemplateColumns: "100px 100px 250px 1fr",
    gridTemplateRows: "100px 100px 250px 100px",
    // if we have 8 children. If among them, 6, consume all grid templates
    // The remains will controlled by the grid-auto-rows
    gridAutoRows: "200px",
  };

  return (
    <>
      <div style={grid1} className="w-1/2 border border-spacing-10 mx-auto">
        <div style={styles1} className="bg-green-800">
          <h2>Demo 1</h2>
          <div>
            <p>
              1. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
        <div style={styles} className="bg-yellow-800">
          <h2>Demo 2</h2>
          <div>
            <p>
              2. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
        <div style={styles} className="bg-orange-800">
          <h2>Demo 3</h2>
          <div>
            <p>
              3. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
        <div style={styles} className="bg-blue-800">
          <h2>Demo 4</h2>
          <div>
            <p>
              4. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
        <div style={styles} className="bg-stone-800">
          <h2>Demo 5</h2>
          <div>
            <p>
              5. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
        <div style={styles} className="bg-pink-800">
          <h2>Demo 6</h2>
          <div>
            <p>
              6. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
