import { ChangeEvent, HTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';

type SpeedSelectionProps = {
    value: number;
    handleChange: (value: number) => void;
} & HTMLAttributes<HTMLDivElement>;

const options = [
    { label: '1x', value: 1000 },
    { label: '2x', value: 500 },
    { label: '3x', value: 300 },
    { label: '4x', value: 100 },
    { label: 'ASAP', value: 0 },
];

export const SpeedSelection: React.FC<SpeedSelectionProps> = ({ value, handleChange, ...props }) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const timeout = parseInt(event.target.value);
        handleChange(timeout);
    };

    return (
        <div {...props}>
            <span>Set speed: </span>
            {options.map((option) => (
                <Form.Check
                    key={option.label}
                    inline
                    type='radio'
                    label={option.label}
                    id={`speed${option.label}`}
                    name='speed'
                    value={`${option.value}`}
                    checked={value === option.value}
                    onChange={onChange}
                />
            ))}
        </div>
    );
};
