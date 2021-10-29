import React, { ChangeEvent } from 'react';
import { Cell } from '../app/Cell';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';
import { getTestField, TEST_FIELDS } from '../app/TestField';
import SudokuTable from './controls/SudokuTable';
import './assets/style.css';

export const SudokuPage: React.FC = () => {
    const [field, setField] = React.useState<Sudoku>(new ClassicSudoku());
    const [initialField, setInitialField] = React.useState<Sudoku | undefined>();
    const [, rerender] = React.useState<object>();

    const rerenderAsync = React.useCallback(() => {
        return new Promise<void>((resolve) => {
            rerender({});
            resolve();
        });
    }, []);

    const handleCellChange = (cell: Cell, value: number): void => {
        cell.fill(value);
        field.validate();
        rerender({});
    };

    const handleSubmit = async (): Promise<void> => {
        if (!initialField) {
            setInitialField(field.clone());
        }
        await field.solve(rerenderAsync);
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
        rerender({});
    };

    const handleSpeedChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const timeout = parseInt(event.target.value);
        field.setTimeoutMs(timeout);
        rerender({});
    };

    const setTestField = (index: number): void => {
        field.stop();
        const testField = getTestField(index);
        setField(testField);
        setInitialField(undefined);
    };

    return (
        <div>
            <SudokuTable field={field} onChange={handleCellChange} />
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
