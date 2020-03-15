import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import "./ModalRules.css";
import Surounded from "./Surounded";

interface Props {
  setModalRules: any;
}

const ModalRules: FunctionComponent<Props> = props => {
  const [rulesImage, setRuleImage] = useState(0);
  const myRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    "11 - Increment the value on axes you want, the Z value is automacally filled : If another vector exists with the same coordinates, value Z will be incremented",
    "12 - Set the new vector",
    "13 - New vector appear in your table",
    "14 - Wait for 2nd player to play",
    " To win you have to align side by side (Ndimensions + 2) vectors",
    " 1 - Three vectors are aligned if the differences between them is proporationnal",
    " 1 - Example : following vectors are aligned",
    " 1 - Example : following vectors are NOT aligned",
    " 2 - Two vectors are side by side if the absolute value of the difference between them is less or equal to 1, in each dimension",
    " 2 - Example : following vectors are side by side",
    " 2 - Example : following vectors are NOT side by side"
  ];

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleScroll = (e: any) => {
    if (myRef && myRef.current) {
      setImage(myRef.current.scrollTop);
    }
  };

  const setImage = (scrollPosition: number) => {
    let imageValue;
    if (scrollPosition === 0) {
      imageValue = 0;
    } else {
      imageValue = Math.trunc((scrollPosition - 1) / 100 + 1);
    }
    console.log(imageValue);
    if (imageValue >= 0 && imageValue < 23 && imageValue !== rulesImage) {
      setRuleImage(imageValue);
    }
  };

  const scrollToGamePlay = () => {
    if (myRef && myRef.current) {
      myRef.current.scrollTo({ top: 0 });
    }
  };

  const scrollToToWin = () => {
    if (myRef && myRef.current) {
      myRef.current.scrollTo({ top: 1600 });
    }
  };

  const setScrollArrow = (event: KeyboardEvent) => {
    if (event.which === 40) {
      if (myRef && myRef.current) {
        myRef.current.scrollTo({ top: myRef.current.scrollTop + 100 });
      }
    }
    if (event.which === 38) {
      if (myRef && myRef.current) {
        myRef.current.scrollTo({ top: myRef.current.scrollTop - 100 });
      }
    }
  };

  return (
    <div>
      <div
        id="modalRules"
        tabIndex={0}
        ref={containerRef}
        onKeyDown={(e: any) => {
          setScrollArrow(e);
        }}
      >
        <div id="ModalRules_quitRules" onClick={() => props.setModalRules(false)}>
          <img src={require("../assets/crossB.png")} width="50" className="" />
        </div>

        <div id="modalRules_container">
          <div id="modalRules_Menu">
            <div
              className="modalRules_Title"
              onClick={scrollToGamePlay}
              style={{ fontWeight: myRef.current && myRef.current.scrollTop < 1600 ? "bold" : "normal" }}
            >
              {" I - Gameplay"}
            </div>
            <div
              className="modalRules_Title"
              onClick={scrollToToWin}
              style={{ fontWeight: myRef.current && myRef.current.scrollTop >= 1600 ? "bold" : "normal" }}
            >
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
              <div id="modalRules_overflow" style={{ height: "calc(100vh + " + text.length * 100 + "px)" }}></div>
            </div>
            <div id="modalRules_textContainer">{text[rulesImage]}</div>
            <div id="modalRules_imageContainer">
              <img src={require("../assets/" + rulesImage.toString() + ".png")} className="modalRules_image" />
              {/* <Surounded style={{ width: 200, height: 200 }}></Surounded> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRules;
