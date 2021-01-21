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

const NestedList = ({ json, nestLevel = 0 }) => {
  nestLevel++;
  return json.map((el, idx) => {
    const containsNestedList = typeof el === "object";
    if (containsNestedList)
      return (
        <details>
          <summary>
            <input
              type={el.type}
              id={`${el.type}-list-${idx}`}
              name={`${el.type}-list-${nestLevel}`}
            />
            {el.title}
          </summary>
          <ul>
            <NestedList json={el.data} nestLevel={nestLevel} />
          </ul>
        </details>
      );
    else return <li>{el}</li>;
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
