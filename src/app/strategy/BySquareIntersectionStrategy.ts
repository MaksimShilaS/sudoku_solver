import { Cell } from '../Cell';
import { SolveStrategy } from './SolveStrategy';

export class BySquareIntersectionStrategy implements SolveStrategy {
    public solve = (cell: Cell, row: Cell[], column: Cell[], square: Cell[]): boolean => {
        return (
            this.fillBySquareIntersection(cell, (c) => c.getRowIndex(), row, square) ||
            this.fillBySquareIntersection(cell, (c) => c.getColumnIndex(), column, square)
        );
    };

    private fillBySquareIntersection = (crossCell: Cell, getRangeIndex: (cell: Cell) => number, range: Cell[], square: Cell[]): boolean => {
        const intersection: Cell[] = [];
        const outersection: Cell[] = [];
        square
            .filter((cell) => !cell.hasValue())
            .forEach((cell) => (getRangeIndex(cell) === getRangeIndex(crossCell) ? intersection.push(cell) : outersection.push(cell)));
        const duplicatedValues = intersection
            .flatMap((cell) => cell.getPossibleValues())
            .filter((value, index, self) => self.indexOf(value) !== index) // Filter only duplicated values
            .filter((value, index, self) => self.indexOf(value) === index) // Leave only unique
            .filter((value) => outersection.every((cell) => !cell.getPossibleValues().includes(value)));
        return duplicatedValues
            .map((duplicatedValue) => {
                return range
                    .filter((cell) => !cell.hasValue())
                    .filter(
                        (cell) =>
                            !intersection.some(
                                (intCell) =>
                                    intCell.getRowIndex() === cell.getRowIndex() && intCell.getColumnIndex() === cell.getColumnIndex()
                            )
                    )
                    .map((cell) => {
                        const possibleValues = cell.getPossibleValues();
                        if (!possibleValues.includes(duplicatedValue)) {
                            return false;
                        }
                        cell.setPossibleValues(possibleValues.filter((value) => value !== duplicatedValue));
                        return true;
                    })
                    .some((hasChanges) => hasChanges === true);
            })
            .some((hasChanges) => hasChanges === true);
    };
}
