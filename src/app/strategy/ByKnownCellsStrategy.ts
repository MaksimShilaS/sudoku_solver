import { Cell } from '../Cell';
import { SolveStrategy } from './SolveStrategy';

export class ByKnownCellsStrategy implements SolveStrategy {
    public solve = (cell: Cell, row: Cell[], column: Cell[], square: Cell[]): boolean => {
        const knownValues = row
            .concat(column)
            .concat(square)
            .filter((cell) => cell.hasValue())
            .map((cell) => cell.getValue())
            .filter((value, index, self) => self.indexOf(value) === index); // Unique values
        const availableValues = cell.getPossibleValues().filter((value) => !knownValues.includes(value));
        if (availableValues.length !== cell.getPossibleValues().length) {
            availableValues.length === 1 ? cell.fill(availableValues[0]) : cell.setPossibleValues(availableValues);
            return true;
        }
        return false;
    };
}
