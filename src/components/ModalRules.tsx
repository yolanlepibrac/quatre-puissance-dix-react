import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import "./ModalRules.css";

interface Props {
  setModalRules: any;
}

const ModalRules: FunctionComponent<Props> = props => {
  const [rulesImage, setRuleImage] = useState(3);
  const myRef = useRef<HTMLDivElement>(null);

  const text = [
    " 1 - There is one axe for each dimension",
    " 2 - The new vector's interface let you add new chips",
    " 3 - You can visualyse the game on 3D representation",
    " 4 - Size of the map is Ndimensions + 5",
    " 5 - The players tab allows to see all played vectors in the game",
    " 6 - Left column is player's 1 vectors",
    " 7 - Right column is player's 2 vectors",
    " 8 - You can changed 3D representation by chose 3 dimensions to display",
    " 8 - You can changed 3D representation by chose 3 dimensions to display",
    " 8 - You can changed 3D representation by chose 3 dimensions to display",
    " 9 - You can changed 3D representation by chose 2 dimensions to display",
    "10 - You can changed 3D representation by chose 1 dimensions to display",
    "11 - Increment the value on axes you want",
    "12 - Set the new vector",
    "13 - New vector appear in your table",
    "14 - Wait for 2nd player to play"
  ];

  const handleScroll = (e: any) => {
    if (myRef && myRef.current) {
      setImage(myRef.current.scrollTop);
    }
  };

  const setImage = (scrollPosition: number) => {
    let imageValue = Math.round((scrollPosition + 300) / 200);
    console.log(imageValue);
    if (imageValue > 2 && imageValue < 19 && imageValue !== rulesImage) {
      setRuleImage(imageValue);
    }
  };

  const scrollToGamePlay = () => {
    console.log("");
  };

  const scrollToToWin = () => {
    console.log("");
  };

  return (
    <div>
      <div id="modalRules">
        <div id="ModalRules_quitRules" onClick={() => props.setModalRules(false)}>
          <img src={require("../assets/cross.png")} width="50" className="" />
        </div>
        <div id="modalRules_container">
          <div id="modalRules_Menu">
            <div className="modalRules_Title" onClick={scrollToGamePlay}>
              {" I - Gameplay"}
            </div>
            <div className="modalRules_Title" onClick={scrollToToWin}>
              {"II - How to win"}
            </div>
          </div>

          <div id="modalRules_content">
            <div
              id="modalRules_scrollContainer"
              ref={myRef}
              onScroll={e => {
                handleScroll(e);
              }}
            >
              <div id="modalRules_overflow"></div>
            </div>
            <div id="modalRules_textContainer">{text[rulesImage]}</div>
            <div id="modalRules_imageContainer">
              <img src={require("../assets/" + rulesImage.toString() + ".png")} className="modalRules_image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRules;
