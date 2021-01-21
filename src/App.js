import "./App.css";
let json = [
  {
    type: "radio",
    data: ["1data1", "1data2"],
  },
  {
    type: "checkbox",
    data: [
      {
        type: "radio",
        data: [
          "2data1",
          "2data2",
          {
            type: "radio",
            data: ["4data1", "4data2"],
          },
          {
            type: "radio",
            data: ["5data1", "5data2", "5data3"],
          },
        ],
      },
      {
        type: "radio",
        data: ["3data1", "3data2", "3data3"],
      },
    ],
  },
  "some string",
];

const NestedList = ({ json }) => {
  return json.map((el) => {
    const containsNestedList = typeof el === "object";
    if (containsNestedList) return <NestedList json={el.data} />;
    else return <div>{el}</div>;
  });
};

function App() {
  return (
    <div>
      <NestedList json={json} />
    </div>
  );
}

export default App;
