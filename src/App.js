import "./App.css";
import { useState } from "react";
let json = [
  {
    type: "radio",
    title: "Title",
    data: [
      {
        type: "radio",
        title: "Title 1 Nest Level 0",
        data: ["leaf 1", "leaf 2"],
      },
      {
        type: "radio",
        title: "Title 2 Nest Level 0",
        data: ["leaf 1", "leaf 2"],
      },
      {
        type: "checkbox",
        title: "Title 3 Nest Level 0",
        data: [
          {
            type: "radio",
            title: "Title 1 Nest Level 1",
            data: [
              "leaf 1",
              "leaf 2",
              {
                type: "radio",
                title: "Title 1 Nest Level 2",
                data: ["leaf 1", "leaf 2"],
              },
              {
                type: "radio",
                title: "Title 2 Nest Level 2",
                data: [
                  {
                    type: "checkbox",
                    title: "Title 1 Nest Level 3",
                    data: ["leaf 1", "leaf 2"],
                  },
                  {
                    type: "checkbox",
                    title: "Title 2 Nest Level 3",
                    data: ["leaf 1", "leaf 2"],
                  },
                  {
                    type: "checkbox",
                    title: "Title 3 Nest Level 3",
                    data: ["leaf 1", "leaf 2"],
                  },
                ],
              },
            ],
          },
          {
            type: "radio",
            title: "Title 2 Nest Level 1",
            data: ["3data1", "3data2", "3data3"],
          },
        ],
      },
    ],
  },
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
        <details open={ifChecked[idx][1]}>
          <summary>
            <input
              className={`clickable regular-${el.type}`}
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
