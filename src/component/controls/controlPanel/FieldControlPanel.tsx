import { useContext, useState } from 'react';
import { ClassicSudoku, Sudoku } from '../../../app/Sudoku';
import { SudokuContext } from '../../SudokuPage';
import { SpeedSelection } from './components/SpeedSelection';
import { TestFieldSelection } from './components/TestFieldSelection';

export const FieldControlPanel: React.FC = () => {
    const { field, setField, rerender, rerenderAsync } = useContext(SudokuContext);
    const [initialField, setInitialField] = useState<Sudoku | undefined>();

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
        rerender();
    };

    const handleSpeedChange = (value: number): void => {
        field.setTimeoutMs(value);
        rerender();
    };

    const setTestField = (field: Sudoku): void => {
        field.stop();
        setField(field);
        setInitialField(undefined);
    };

    return (
        <div>
            <div className='m-2'>
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
            <TestFieldSelection className='m-2' handleSubmit={setTestField} />
            <SpeedSelection className='m-2' value={field.getTimeoutMs()} handleChange={handleSpeedChange} />
        </div>
    );
};
