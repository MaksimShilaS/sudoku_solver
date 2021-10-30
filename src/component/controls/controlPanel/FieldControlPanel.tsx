import { ChangeEvent, useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { ClassicSudoku, Sudoku } from '../../../app/Sudoku';
import { getTestField, TEST_FIELDS } from '../../../app/TestField';
import { SudokuContext } from '../../SudokuPage';

const FieldControlPanel: React.FC = () => {
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

    const handleSpeedChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const timeout = parseInt(event.target.value);
        field.setTimeoutMs(timeout);
        rerender();
    };

    const setTestField = (index: number): void => {
        field.stop();
        const testField = getTestField(index);
        setField(testField);
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
            <div className='m-2'>
                {TEST_FIELDS.map((field, index) => (
                    <button onClick={() => setTestField(index)}>Use Test Field {index + 1}</button>
                ))}
            </div>
            <div className='m-2'>
                <span>Set speed: </span>
                {[
                    { label: '1x', value: 1000 },
                    { label: '2x', value: 500 },
                    { label: '3x', value: 300 },
                    { label: '4x', value: 100 },
                    { label: 'ASAP', value: 0 },
                ].map((v) => (
                    <Form.Check
                        inline
                        type='radio'
                        label={v.label}
                        id={`speed${v.label}`}
                        name='speed'
                        value={`${v.value}`}
                        checked={field.getTimeoutMs() === v.value}
                        onChange={handleSpeedChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default FieldControlPanel;
