import '../css/MinesweeperWindow.css'
import React, {useEffect, useState} from "react";
import GameWindow from "./GameWindow";

const MinesweeperWindow: React.FC = () => {
    const [height, setHeight] = useState(9);
    const [length, setLenght] = useState(9);

    const [matrix, setMatrix] = useState(Array.from({ length: height }, () => Array.from({ length: length }, () => 0)));

    useEffect(() => {
        createMines();
    })

    const updateMatrixValue = (row, col, newValue) => {
        const newMatrix = matrix.map((innerArray, r) =>
            r === row
                ? innerArray.map((item, c) => (c === col ? newValue : item))
                : innerArray
        );

        setMatrix(newMatrix);
    };

    const createMines = () => {
        for (let i = 0; i < 10; i++) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);

            if (matrix[x][y] == 0) {
                matrix[x][y] = -1;
            } else {
                i--
            }
        }
    }

    const checkAround = (row: number, col: number) => {
        let mines = 0;

        if (matrix[row][col] == -1) return -1;

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((row + i) < 0 || (row + i) > length - 1) continue;
                if ((col + j) < 0 || (col + j) > length - 1) continue;

                if (matrix[row + i][ col + j] == -1) {
                    mines++
                }
            }
        }

        return mines;
    }

    return(
        <div className="container">
            <GameWindow gameMatrix={matrix} checkAround={checkAround} />
        </div>
    )
}

export default MinesweeperWindow