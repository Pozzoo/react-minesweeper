import React, { useRef } from "react";

import '../css/GameWindow.css'
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

type GameWindowProps = {
    gameMatrix: [number, number];
    checkAround: () => number
}

const GameWindow: React.FC<GameWindowProps> = props => {

    const buttonsRef = useRef<HTMLButtonElement[]>([]);

    function handleClick(row: number, col: number) {

        return () => {
            const mines = props.checkAround(row, col);
            buttonsRef.current[row + col * 10].innerText = (mines == 0) ? ' ' : mines;
            buttonsRef.current[row + col * 10].style.border = 'none';
            buttonsRef.current[row + col * 10].value = "clicked";

            if (mines != 0) return;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if ((row + i) < 0 || (row + i) > 9) continue;
                    if ((col + j) < 0 || (col + j) > 9) continue;
                    
                    if (buttonsRef.current[(row + i) + ((col + j) * 10)].value == "clicked") continue;

                    buttonsRef.current[(row + i) + ((col + j) * 10)].click();
                }
            }
        }
    }

    return(
        <div className="game-window">
            {props.gameMatrix.map((row: number, col: number) => (
                <div className="row" key={col}>
                    {row.map((value: number, row: number) => (
                        <button ref={(el) => {buttonsRef.current[row + (col * 10)] = el}} onClick={handleClick(row, col)} key={row + col} ></button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameWindow;