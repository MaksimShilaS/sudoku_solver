import React from 'react';
import { AVAILABLE_CELL_VALUES, DEFAULT_CELL_VALUE } from '../app/Cell';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';
import './style.css';

export const SudokuTable: React.FC = () => {
    const [field, setField] = React.useState<Sudoku>(new ClassicSudoku());
    const [, updateState] = React.useState<object>();

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleSubmit = (): void => {
        field.solve(forceUpdate);
    };

    const handleCellChange = (rowIndex: number, cellIndex: number, value: string): void => {
        const cellValue = value ? parseInt(value.substr(value.length - 1)) : DEFAULT_CELL_VALUE;
        if (cellValue !== DEFAULT_CELL_VALUE && !AVAILABLE_CELL_VALUES.includes(cellValue)) {
            return;
        }
        const fieldCopy = field.clone();
        fieldCopy.getCell(rowIndex, cellIndex).setValue(cellValue);
        fieldCopy.validate();
        setField(fieldCopy);
    };

    return (
        <div>
            <table className='game-table'>
                <tbody>
                    {field.getCells().map((row, rowIndex) => (
                        <tr className='game-table__row' key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className='game-table__row__cell' key={cellIndex}>
                                    <input
                                        className={'game-table__row__cell__input' + (cell.isValid() ? '' : ' invalid-cell')}
                                        onChange={(event) => handleCellChange(rowIndex, cellIndex, event.target.value)}
                                        value={cell.getValue() === DEFAULT_CELL_VALUE ? '' : cell.getValue()}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit} disabled={!field.isValid()}>
                Solve
            </button>
        </div>
    );
};
