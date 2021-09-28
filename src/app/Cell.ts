interface CellType {
    limitRange: (values: number[]) => boolean; // Removes provided values from available on this cell. Returns true if there was matches
    isValid: () => boolean;
    setIsValid: (isValid: boolean) => void;
    setValue: (value: number) => void;
    getValue: () => number;
    hasValue: () => boolean;
}

export const DEFAULT_CELL_VALUE = 0;
export const AVAILABLE_CELL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Cell implements CellType {
    private value = DEFAULT_CELL_VALUE;
    private valid = true;
    private possibleValues = AVAILABLE_CELL_VALUES;

    public limitRange = (values: number[]): boolean => {
        const filteredValues = this.possibleValues.filter((val) => !values.includes(val));
        if (filteredValues.length !== this.possibleValues.length) {
            this.possibleValues = filteredValues;
            if (this.possibleValues.length === 1) {
                this.setValue(this.possibleValues[0]);
                this.possibleValues = [];
            }
            return true;
        }
        return false;
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
}
