import { Notification } from '../utils/Notification';
import { Cell, DEFAULT_CELL_VALUE } from './Cell';

export interface Sudoku {
    solve: (onValueSet: () => void) => void;
    getCells: () => Cell[][];
    getCell: (rowIndex: number, cellIndex: number) => Cell;
    validate: () => void;
    isValid: () => boolean;
    clone: () => Sudoku;
}

export class ClassicSudoku implements Sudoku {
    private spec = { length: 9 };
    private cells: Cell[][];

    constructor() {
        this.cells = this.emptyField();
    }

    public solve = (onValueSet: () => void): void => {
        this.validate();
        if (!this.isValid) {
            Notification.error('Sudoku field data is not valid');
            return;
        }
        let hasChanges = false;
        const columns = this.getColumns();
        do {
            const cellsUpdated = this.cells.flatMap((row, rowIndex) => {
                return row.map((cell, columnIndex) => {
                    if (cell.hasValue()) {
                        return false;
                    }
                    const column = columns[columnIndex];
                    const square = this.getSquare(rowIndex, columnIndex).flatMap((cell) => cell);
                    const knownValues = row
                        .concat(column)
                        .concat(square)
                        .filter((cell) => cell.hasValue())
                        .map((cell) => cell.getValue())
                        .filter((value, index, self) => self.indexOf(value) === index); // Unique values
                    const cellUpdated = cell.limitRange(knownValues);
                    if (cell.hasValue()) {
                        onValueSet();
                    }
                    return cellUpdated;
                });
            });
            hasChanges = cellsUpdated.filter((cellUpdated) => cellUpdated).length > 0;
        } while (!this.solved() && hasChanges);
        if (!this.solved()) {
            Notification.warn("Couldn't solve this sudoku");
        }
    };

    public getCells = (): Cell[][] => {
        return this.cells;
    };

    public getCell = (rowIndex: number, cellIndex: number): Cell => {
        return this.cells[rowIndex][cellIndex];
    };

    public validate = (): void => {
        this.cells.forEach((row) => row.forEach((cell) => cell.setIsValid(true)));
        const rows = this.cells;
        const columns = this.getColumns();
        const squares = this.getSquares();
        this.validateRanges(rows);
        this.validateRanges(columns);
        this.validateRanges(squares);
    };

    public isValid = (): boolean => {
        return this.cells.flatMap((v) => v).filter((cell) => !cell.isValid()).length === 0;
    };

    public clone = (): Sudoku => {
        const clone = new ClassicSudoku();
        this.cells.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                clone.getCell(rowIndex, cellIndex).setValue(cell.getValue());
            });
        });
        return clone;
    };

    private validateRanges = (ranges: Cell[][]): void => {
        ranges.forEach((range) => {
            range.forEach((cell) => {
                if (cell.getValue() === DEFAULT_CELL_VALUE || !cell.isValid()) {
                    return;
                }
                const isValid = !this.isDuplicated(cell, range);
                cell.setIsValid(isValid);
            });
        });
    };

    private getColumns = (): Cell[][] => {
        const columns = new Array<Array<Cell>>();
        for (let i = 0; i < this.spec.length; i++) {
            const column = this.cells.map((row) => row[i]);
            columns.push(column);
        }
        return columns;
    };

    private getSquares = (): Cell[][] => {
        return [
            this.getSquare(0, 0).flatMap((r) => r),
            this.getSquare(0, 3).flatMap((r) => r),
            this.getSquare(0, 6).flatMap((r) => r),
            this.getSquare(3, 0).flatMap((r) => r),
            this.getSquare(3, 3).flatMap((r) => r),
            this.getSquare(3, 6).flatMap((r) => r),
            this.getSquare(6, 0).flatMap((r) => r),
            this.getSquare(6, 3).flatMap((r) => r),
            this.getSquare(6, 6).flatMap((r) => r),
        ];
    };

    private solved = (): boolean => {
        return this.cells.flatMap((c) => c).filter((c) => !c.hasValue()).length === 0;
    };

    private getSquare = (rowIndex: number, columnIndex: number): Cell[][] => {
        const rowRange = this.getSquareIndexes(rowIndex);
        const colRange = this.getSquareIndexes(columnIndex);
        const rows = this.cells.slice(rowRange.start, rowRange.end + 1);
        const square = rows.map((row) => row.slice(colRange.start, colRange.end + 1));
        return square;
    };

    private isDuplicated = (cell: Cell, cells: Cell[]): boolean => {
        return cells.filter((c) => c.getValue() === cell.getValue()).length > 1;
    };

    private getSquareIndexes = (index: number): { start: number; end: number } => {
        if ([0, 1, 2].includes(index)) {
            return { start: 0, end: 2 };
        }
        if ([3, 4, 5].includes(index)) {
            return { start: 3, end: 5 };
        }
        if ([6, 7, 8].includes(index)) {
            return { start: 6, end: 8 };
        }
        return { start: -1, end: -1 };
    };

    private emptyField = (): Cell[][] => {
        return Array.from(this.spec, () => Array.from(this.spec, () => new Cell()));
    };
}
