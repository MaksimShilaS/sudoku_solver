import { Cell } from '../Cell';
import { SolveStrategy } from './SolveStrategy';

export class BySinglePossibleValueStrategy implements SolveStrategy {
    public solve = (cell: Cell, row: Cell[], column: Cell[], square: Cell[]): boolean => {
        const possibleValues = cell.getPossibleValues();
        for (let i = 0; i < possibleValues.length; i++) {
            const possibleValue = possibleValues[i];
            const isSinglePossibleCell =
                row.filter((c) => c.getPossibleValues().includes(possibleValue)).length === 1 ||
                column.filter((c) => c.getPossibleValues().includes(possibleValue)).length === 1 ||
                square.filter((c) => c.getPossibleValues().includes(possibleValue)).length === 1;
            if (isSinglePossibleCell) {
                cell.fill(possibleValue);
                return true;
            }
        }
        return false;
    };
}
