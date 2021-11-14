import { useContext, useState } from 'react';
import styles from './assets/styles.module.css';
import { Cell } from '../../../app/Cell';
import { CellView } from './CellView';
import { Form } from 'react-bootstrap';
import { SudokuContext } from '../../SudokuPage';

export const TableView: React.FC = () => {
    const { field, rerender } = useContext(SudokuContext);
    const [showPossibleValues, setShowPossibleValues] = useState<boolean>(false);

    const handleCellChange = (cell: Cell, value: number) => {
        cell.fill(value);
        field.validate();
        rerender();
    };

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    {field.getCells().map((row, rowIndex) => (
                        <tr className={styles.row} key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className={styles.cell} key={cellIndex}>
                                    <CellView
                                        key={cellIndex}
                                        cell={cell}
                                        showPossibleValues={showPossibleValues}
                                        onChange={handleCellChange}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Form.Check
                label='Show possible values'
                checked={showPossibleValues}
                onChange={(e) => setShowPossibleValues(e.target.checked)}
            />
        </>
    );
};
