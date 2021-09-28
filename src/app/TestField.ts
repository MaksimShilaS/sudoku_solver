import { DEFAULT_CELL_VALUE } from './Cell';
import { ClassicSudoku, Sudoku } from './Sudoku';

const TEST_FIELDS = new Map([
    [
        1,
        [
            [0, 0, 6, 8, 7, 1, 0, 0, 3],
            [0, 7, 3, 0, 5, 6, 1, 9, 0],
            [0, 0, 0, 3, 4, 9, 0, 2, 7],
            [3, 4, 2, 0, 0, 0, 0, 8, 0],
            [0, 6, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 5, 2],
            [0, 1, 0, 7, 0, 4, 8, 0, 0],
            [7, 0, 0, 5, 9, 8, 2, 6, 1],
            [0, 0, 5, 0, 0, 0, 9, 0, 0],
        ],
    ],
    [
        2,
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 6, 5, 0, 2, 0, 9, 1, 0],
            [0, 0, 8, 3, 1, 5, 2, 0, 0],
            [0, 0, 0, 2, 6, 9, 0, 0, 0],
            [0, 5, 2, 0, 0, 0, 1, 7, 0],
            [0, 0, 0, 5, 7, 1, 0, 0, 0],
            [0, 0, 4, 6, 9, 7, 3, 0, 0],
            [0, 2, 7, 0, 5, 0, 6, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    [
        3,
        [
            [0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 8, 0, 0, 0, 0, 0, 6, 0],
            [6, 0, 9, 0, 0, 0, 3, 0, 8],
            [0, 2, 0, 1, 0, 4, 0, 3, 0],
            [5, 0, 0, 3, 9, 2, 0, 0, 7],
            [0, 1, 0, 8, 0, 5, 0, 9, 0],
            [4, 0, 3, 0, 0, 0, 2, 0, 6],
            [0, 5, 0, 0, 0, 0, 0, 8, 0],
            [0, 0, 0, 0, 3, 0, 0, 0, 0],
        ],
    ],
]);

export const getTestField = (index: number): Sudoku => {
    const field = new ClassicSudoku();
    const values = TEST_FIELDS.get(index);
    if (values) {
        field.getCells().forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const value = values[rowIndex][cellIndex];
                if (value !== DEFAULT_CELL_VALUE) {
                    cell.setValue(value);
                }
            });
        });
    }
    return field;
};
