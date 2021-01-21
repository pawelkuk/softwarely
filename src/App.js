import "./App.css";
let json = [
  {
    type: "radio",
    title: "some title",
    data: ["1data1", "1data2"],
  },
  {
    type: "checkbox",
    title: "some title xd",
    data: [
      {
        type: "radio",
        title: "some title xdd",
        data: [
          "2data1",
          "2data2",
          {
            type: "radio",
            title: "some title awdaw",
            data: ["4data1", "4data2"],
          },
          {
            type: "radio",
            title: "some title mhm",
            data: [
              {
                type: "checkbox",
                title: "some title awdaw",
                data: ["4data1", "4data2"],
              },
              {
                type: "checkbox",
                title: "some title awdaw",
                data: ["4data1", "4data2"],
              },
              {
                type: "checkbox",
                title: "some title awdaw",
                data: ["4data1", "4data2"],
              },
            ],
          },
        ],
      },
      {
        type: "radio",
        title: "some title",
        data: ["3data1", "3data2", "3data3"],
      },
    ],
  },
  "some string",
];

const NestedList = ({ json, type, isEven, nestLevel = 0 }) => {
  return json.map((el, idx) => {
    const containsNestedList = typeof el === "object";
    if (containsNestedList)
      return (
        <div>
          <input
            type={el.type}
            id={`${el.type}-list-${idx}`}
            name={`${el.type}-list-${nestLevel}`}
          />
          <label for={`radio-list-${idx}`}>{el.title}</label>
          <NestedList
            json={el.data}
            type={el.type}
            isEven={idx % 2 === 0}
            nestLevel={nestLevel++}
          />
        </div>
      );
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
