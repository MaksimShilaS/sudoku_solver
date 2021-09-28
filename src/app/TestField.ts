import { ClassicSudoku, Sudoku } from './Sudoku';

const TEST_FIELDS = new Map([
    [
        1,
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
]);

export const getTestField = (index: number): Sudoku => {
    const field = new ClassicSudoku();
    const values = TEST_FIELDS.get(index);
    if (values) {
        field.getCells().forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                cell.setValue(values[rowIndex][cellIndex]);
            });
        });
    }
    return field;
};
