import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AVAILABLE_CELL_VALUES, AVAILABLE_CELL_VALUES_FIELD, Cell, DEFAULT_CELL_VALUE } from '../../../app/Cell';
import styles from './assets/styles.module.css';

interface CellViewProps {
    cell: Cell;
    showPossibleValues: boolean;
    onChange: (cell: Cell, value: number) => void;
}

export const CellView: React.FC<CellViewProps> = ({ cell, showPossibleValues, onChange }) => {
    const [forceEdit, setForceEdit] = useState<boolean>(false);
    const cellValue = cell.getValue();
    const possibleValues = cell.getPossibleValues();
    const isValid = cell.isValid();
    const hasValue = cellValue !== DEFAULT_CELL_VALUE;

    const handleCellValueChange = (cell: Cell, value: string): void => {
        if (!value) {
            onChange(cell, DEFAULT_CELL_VALUE);
        }
        const singleCharValue = value.substr(value.length - 1);
        const cellValue = parseInt(singleCharValue);
        if (AVAILABLE_CELL_VALUES.includes(cellValue) || cellValue === DEFAULT_CELL_VALUE) {
            onChange(cell, cellValue);
        }
    };

    return (
        <>
            {(!showPossibleValues || forceEdit || hasValue) && (
                <input
                    className={`${styles.cellInput} ${isValid ? '' : styles.invalidCell}`}
                    onChange={(event) => handleCellValueChange(cell, event.target.value)}
                    value={hasValue ? cellValue : ''}
                    onBlur={() => setForceEdit(false)}
                    autoFocus={forceEdit}
                />
            )}
            {showPossibleValues && !forceEdit && possibleValues.length > 0 && (
                <div className={styles.possibleValuesTable} onClick={() => setForceEdit(true)}>
                    {AVAILABLE_CELL_VALUES_FIELD.map((row, rowIndex) => (
                        <Row key={rowIndex} className='m-0 p-0'>
                            {row.map((value, colIndex) => (
                                <Col key={colIndex} className={`${styles.possibleValueCell} m-0`}>
                                    {possibleValues.includes(value) ? `${value}` : '-'}
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
            )}
        </>
    );
};
