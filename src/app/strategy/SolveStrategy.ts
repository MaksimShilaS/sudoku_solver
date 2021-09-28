import { Cell } from '../Cell';

export interface SolveStrategy {
    solve: (cell: Cell, row: Cell[], column: Cell[], square: Cell[]) => boolean;
}
