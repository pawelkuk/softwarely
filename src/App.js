import "./App.css";
import { useState } from "react";
// the input data should be an Array of either a string or an object
// with properties: type->"radio" or "checkbox", title -> string and
// data -> Array with the aforementioned values (and so on)
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

const NestedList = ({ data, nestLevel = 0 }) => {
  const handleClick = (clickedType, idxOfClicked) => {
    setIfChecked(
      ifChecked.map(([currType, currVal], currIdx) => {
        if (clickedType === "checkbox" && idxOfClicked === currIdx)
          // flip only the value of the clicked checkbox
          return [currType, !currVal];
        if (clickedType === "checkbox" && idxOfClicked !== currIdx)
          // leave as is
          return [currType, currVal];
        if (
          clickedType === "radio" &&
          currType === "radio" &&
          idxOfClicked === currIdx
        )
          // check the radio button if it was the clicked radio button
          return [currType, true];
        if (
          clickedType === "radio" &&
          currType === "radio" &&
          idxOfClicked !== currIdx
        )
          // uncheck the radio button if it was NOT the clicked radio button
          return [currType, false];
        if (clickedType === "radio" && currType === "checkbox")
          // checkboxes are not affected by clicking radio buttons
          return [currType, currVal];
        else return ["error", "error"]; // inconsistent state
      })
    );
  };
  let [ifChecked, setIfChecked] = useState(
    data.map((el) => (nestLevel === 0 ? [el.type, true] : [el.type, false]))
  );
  nestLevel++;
  return data.map((el, idx) => {
    const containsOfNestedList = typeof el === "object";
    if (containsOfNestedList)
      return (
        <details open={ifChecked[idx][1]}>
          <summary>
            <input
              className={`clickable regular-${el.type}`}
              type={el.type}
              id={`${el.type}-list-${idx}`}
              name={`${el.type}-list-${nestLevel}`}
              checked={ifChecked[idx][1]}
              onChange={() => handleClick(el.type, idx)}
            />
            {el.title}
          </summary>
          <ul className="list-wrapper content">
            <div className="line"></div>
            <NestedList data={el.data} nestLevel={nestLevel} />
          </ul>
        </details>
      );
    else return <li>{el}</li>;
  });
};

function App() {
  return <NestedList data={json} />;
}

export default App;
