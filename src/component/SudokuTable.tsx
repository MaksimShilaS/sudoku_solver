import React, { ChangeEvent } from 'react';
import { AVAILABLE_CELL_VALUES, DEFAULT_CELL_VALUE } from '../app/Cell';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';
import { getTestField, TEST_FIELDS } from '../app/TestField';
import './style.css';

export const SudokuTable: React.FC = () => {
    const [field, setField] = React.useState<Sudoku>(new ClassicSudoku());
    const [initialField, setInitialField] = React.useState<Sudoku | undefined>();
    const [showPossibleValues, setShowPossibleValues] = React.useState<boolean>(false);
    const [, updateState] = React.useState<object>();

    const forceUpdate = React.useCallback(() => {
        return new Promise<void>((resolve) => {
            updateState({});
            resolve();
        });
    }, []);

    const handleSubmit = async (): Promise<void> => {
        if (!initialField) {
            setInitialField(field.clone());
        }
        await field.solve(forceUpdate);
    };

    const handleCellChange = (rowIndex: number, cellIndex: number, value: string): void => {
        const cellValue = value ? parseInt(value.substr(value.length - 1)) : DEFAULT_CELL_VALUE;
        if (cellValue !== DEFAULT_CELL_VALUE && !AVAILABLE_CELL_VALUES.includes(cellValue)) {
            return;
        }
        field.getCell(rowIndex, cellIndex).fill(cellValue);
        field.validate();
        updateState({});
    };

    const handleReset = (): void => {
        if (initialField) {
            field.stop();
            setField(initialField.clone());
        }
    };

    const handleClear = (): void => {
        field.stop();
        setField(new ClassicSudoku());
        setInitialField(undefined);
    };

    const handlePause = (): void => {
        field.isPaused() ? field.continue() : field.pause();
        updateState({});
    };

    const handleSpeedChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const timeout = parseInt(event.target.value);
        field.setTimeoutMs(timeout);
        updateState({});
    };

    const setTestField = (index: number): void => {
        field.stop();
        const testField = getTestField(index);
        setField(testField);
        setInitialField(undefined);
    };

    return (
        <div>
            <table className='game-table'>
                <tbody>
                    {field.getCells().map((row, rowIndex) => (
                        <tr className='game-table__row' key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className='game-table__row__cell' key={cellIndex}>
                                    {(!showPossibleValues || cell.getValue() !== DEFAULT_CELL_VALUE) && (
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
                <button onClick={handleSubmit} disabled={!field.isValid() || field.isRunning()}>
                    Solve
                </button>
                <button onClick={handlePause} disabled={!field.isRunning()}>
                    {field.isPaused() ? 'Continue' : 'Pause'}
                </button>
                <button onClick={handleReset} disabled={!initialField}>
                    Reset
                </button>
                <button onClick={handleClear}>Clear</button>
                <span> Show possible values</span>
                <input type='checkbox' value={`${showPossibleValues}`} onChange={(event) => setShowPossibleValues(event.target.checked)} />
            </div>
            <div>
                {TEST_FIELDS.map((field, index) => (
                    <button onClick={() => setTestField(index)}>Use Test Field {index + 1}</button>
                ))}
            </div>
            <div>
                <span>Set speed: </span>
                {[
                    { label: '1x', value: 1000 },
                    { label: '2x', value: 500 },
                    { label: '3x', value: 300 },
                    { label: '4x', value: 100 },
                    { label: 'ASAP', value: 0 },
                ].map((v) => (
                    <div key={v.label} style={{ display: 'inline-block' }}>
                        <label> {v.label}</label>
                        <input
                            type='radio'
                            id={`speed${v.label}`}
                            name='speed'
                            value={`${v.value}`}
                            checked={field.getTimeoutMs() === v.value}
                            onChange={handleSpeedChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
