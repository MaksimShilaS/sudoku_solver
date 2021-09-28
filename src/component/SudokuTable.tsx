import React from 'react';
import { AVAILABLE_CELL_VALUES, DEFAULT_CELL_VALUE } from '../app/Cell';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';
import { getTestField } from '../app/TestField';
import './style.css';

export const SudokuTable: React.FC = () => {
    const [field, setField] = React.useState<Sudoku>(new ClassicSudoku());
    const [initialField, setInitialField] = React.useState<Sudoku | undefined>();
    const [showPossibleValues, setShowPossibleValues] = React.useState<boolean>(false);
    const [, updateState] = React.useState<object>();

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleSubmit = (): void => {
        if (!initialField) {
            setInitialField(field.clone());
        }
        field.solve(forceUpdate);
    };

    const handleCellChange = (rowIndex: number, cellIndex: number, value: string): void => {
        const cellValue = value ? parseInt(value.substr(value.length - 1)) : DEFAULT_CELL_VALUE;
        if (cellValue !== DEFAULT_CELL_VALUE && !AVAILABLE_CELL_VALUES.includes(cellValue)) {
            return;
        }
        const fieldCopy = field.clone();
        fieldCopy.getCell(rowIndex, cellIndex).fill(cellValue);
        fieldCopy.validate();
        setField(fieldCopy);
    };

    const handleReset = (): void => {
        console.log(initialField);
        if (initialField) {
            setField(initialField.clone());
        }
    };

    const handleClear = (): void => {
        setField(new ClassicSudoku());
        setInitialField(undefined);
    };

    const setTestField = (index: number): void => {
        const field = getTestField(index);
        setField(field);
    };

    console.log(showPossibleValues);
    return (
        <div>
            <table className='game-table'>
                <tbody>
                    {field.getCells().map((row, rowIndex) => (
                        <tr className='game-table__row' key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className='game-table__row__cell' key={cellIndex}>
                                    {(!showPossibleValues || cell.getValue() != DEFAULT_CELL_VALUE) && (
                                        <input
                                            className={'game-table__row__cell__input' + (cell.isValid() ? '' : ' invalid-cell')}
                                            onChange={(event) => handleCellChange(rowIndex, cellIndex, event.target.value)}
                                            value={cell.getValue() === DEFAULT_CELL_VALUE ? '' : cell.getValue()}
                                        />
                                    )}
                                    {showPossibleValues && <span>{cell.getPossibleValues().join(' ')}</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handleSubmit} disabled={!field.isValid()}>
                    Solve
                </button>
                <button onClick={handleReset} disabled={!initialField}>
                    Reset
                </button>
                <button onClick={handleClear}>Clear</button>
                <span> Show possible values</span>
                <input type='checkbox' value={`${showPossibleValues}`} onChange={(event) => setShowPossibleValues(event.target.checked)} />
            </div>
            <div>
                <button onClick={() => setTestField(1)}>Use Test Field 1</button>
                <button onClick={() => setTestField(2)}>Use Test Field 2</button>
                <button onClick={() => setTestField(3)}>Use Test Field 3</button>
            </div>
        </div>
    );
};
