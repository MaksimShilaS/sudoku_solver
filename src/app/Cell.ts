import { Notification } from '../utils/Notification';

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
export const AVAILABLE_CELL_VALUES_FIELD = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
export const AVAILABLE_CELL_VALUES = AVAILABLE_CELL_VALUES_FIELD.flatMap((v) => v);

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
        Notification.info(`Set value ${value} to cell [${this.rowIndex}:${this.columnIndex}]`);
        this.setValue(value);
        this.possibleValues = value === DEFAULT_CELL_VALUE ? AVAILABLE_CELL_VALUES : [];
    };

    public isValid = (): boolean => {
        return this.valid && (this.hasValue() || this.possibleValues.length > 0);
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
