import { Cell } from '../Cell';
import { SolveStrategy } from './SolveStrategy';

export class ByValuesRangeStrategy implements SolveStrategy {
    public solve = (cell: Cell, row: Cell[], column: Cell[], square: Cell[]): boolean => {
        return this.filterByTwoMergedCells(row) || this.filterByTwoMergedCells(column) || this.filterByTwoMergedCells(square);
    };

    private filterByTwoMergedCells = (cells: Cell[]): boolean => {
        const cellsToCheck = cells.filter((c) => !c.hasValue());
        if (cellsToCheck.length === 2) {
            return false;
        }
        let hasChanges = false;
        for (let leftIndex = 0; leftIndex < cellsToCheck.length - 1; leftIndex++) {
            for (let rightIndex = leftIndex + 1; rightIndex < cellsToCheck.length; rightIndex++) {
                const left = cellsToCheck[leftIndex].getPossibleValues();
                const right = cellsToCheck[rightIndex].getPossibleValues();
                if (left.length === 2 && this.arraysSame(left, right)) {
                    for (let cellIndex = 0; cellIndex < cellsToCheck.length; cellIndex++) {
                        if (cellIndex === leftIndex || cellIndex === rightIndex) {
                            continue;
                        }
                        const cell = cellsToCheck[cellIndex];
                        const possibleValues = cell.getPossibleValues();
                        const diff = this.remove(possibleValues, left);
                        if (diff.length !== possibleValues.length) {
                            cell.setPossibleValues(diff);
                            hasChanges = true;
                        }
                    }
                }
            }
        }
        return hasChanges;
    };

    private arraysSame = (arr1: number[], arr2: number[]) => {
        // That works only for arrays without duplicates
        return arr1.length === arr2.length && arr1.every((num) => arr2.includes(num));
    };

    private remove = (source: number[], rangeToRemove: number[]): number[] => {
        return source.filter((value) => !rangeToRemove.includes(value));
    };
}
