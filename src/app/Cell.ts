interface CellType {
    isValid: () => boolean;
    setIsValid: (isValid: boolean) => void;
    setValue: (value: number) => void;
    getValue: () => number;
    hasValue: () => boolean;
    getPossibleValues: () => number[];
    setPossibleValues: (values: number[]) => void;
    fill: (value: number) => void;
    getRowIndex: () => number;
    getColumnIndex: () => number;
}

export const DEFAULT_CELL_VALUE = 0;
export const AVAILABLE_CELL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Cell implements CellType {
    private value = DEFAULT_CELL_VALUE;
    private valid = true;
    private possibleValues = AVAILABLE_CELL_VALUES;
    private rowIndex;
    private columnIndex;

    constructor(rowIndex: number, columnIndex: number) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }

    public getRowIndex = (): number => this.rowIndex;

    public getColumnIndex = (): number => this.columnIndex;

    public fill = (value: number): void => {
        this.setValue(value);
        this.possibleValues = [];
    };

    public isValid = (): boolean => {
        return this.valid;
    };

    public setIsValid = (isValid: boolean): void => {
        this.valid = isValid;
    };

    public setValue = (value: number): void => {
        this.value = value;
    };

    public getValue = (): number => {
        return this.value;
    };

    public hasValue = (): boolean => {
        return this.value !== DEFAULT_CELL_VALUE;
    };

    public getPossibleValues = (): number[] => {
        return this.possibleValues;
    };

    public setPossibleValues = (values: number[]): void => {
        this.possibleValues = values;
    };
}
