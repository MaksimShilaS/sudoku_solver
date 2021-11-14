import { ChangeEvent, HTMLAttributes, useState } from 'react';
import { Sudoku } from '../../../../app/Sudoku';
import { getTestField, TEST_FIELDS } from '../../../../app/TestField';

type TestFieldSelectionProps = {
    handleSubmit: (field: Sudoku) => void;
} & HTMLAttributes<HTMLDivElement>;

const MAX_INDEX = TEST_FIELDS.length;

export const TestFieldSelection: React.FC<TestFieldSelectionProps> = ({ handleSubmit, ...props }) => {
    const [index, setIndex] = useState<number | null>(null);

    const handleFieldIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(event.target.value);
        if (!index || index === 0 || index > MAX_INDEX) {
            return;
        }
        setIndex(index);
    };

    const onSetFieldButtonClick = () => {
        if (!index) {
            return;
        }
        const testField = getTestField(index - 1);
        handleSubmit(testField);
    };

    return (
        <div {...props}>
            <input
                onChange={handleFieldIndexChange}
                value={`${index ?? ''}`}
                placeholder={`Select field from 1 to ${MAX_INDEX}`}
            />
            <button onClick={onSetFieldButtonClick} disabled={!index}>
                Set Field
            </button>
        </div>
    );
};
