import "./App.css";
import { useState } from "react";
let json = [
  {
    type: "radio",
    title: "some title",
    data: ["1data1", "1data2"],
  },
  {
    type: "radio",
    title: "some title x",
    data: ["1data1x", "1data2x"],
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
  const handleClick = (e, type, idx) => {
    setIfChecked(
      ifChecked.map(([t, val], index) => {
        if (type === "checkbox") {
          if (idx === index) return [t, !val];
          else return [t, val];
        } else if (type === "radio" && t === "radio") {
          if (idx === index) return [t, true];
          else return [t, false];
        } else if (type === "radio" && t === "checkbox") return [t, val];
        else return ["error", "error"];
      })
    );
  };
  let [ifChecked, setIfChecked] = useState(json.map((el) => [el.type, false]));
  nestLevel++;
  return json.map((el, idx) => {
    const containsNestedList = typeof el === "object";
    if (containsNestedList)
      return (
        <details className="details7" open={ifChecked[idx][1]}>
          <summary>
            <input
              className="clickable"
              type={el.type}
              id={`${el.type}-list-${idx}`}
              name={`${el.type}-list-${nestLevel}`}
              checked={ifChecked[idx][1]}
              onChange={(e) => handleClick(e, el.type, idx)}
            />
            {el.title}
          </summary>
          <ul className="list-wrapper content">
            <div className="line"></div>
            <NestedList json={el.data} nestLevel={nestLevel} />
          </ul>
        </details>
      );
    else return <li>{el}</li>;
  });
};

function App() {
  return <NestedList json={json} />;
}

export default App;
