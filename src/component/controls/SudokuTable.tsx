import { ChangeEvent, useState } from 'react';
import { AVAILABLE_CELL_VALUES, AVAILABLE_CELL_VALUES_FIELD, Cell, DEFAULT_CELL_VALUE } from '../../app/Cell';
import { Sudoku } from '../../app/Sudoku';
import './assets/style.css';

interface SudokuTableProps {
    field: Sudoku;
    onChange: (cell: Cell, value: number) => void;
}

interface CellViewProps {
    cell: Cell;
    showPossibleValues: boolean;
    onChange: (cell: Cell, value: number) => void;
}

interface PossibleValuesViewProps {
    possibleValues: number[];
}

const SudokuTable: React.FC<SudokuTableProps> = ({ field, onChange }) => {
    const [showPossibleValues, setShowPossibleValues] = useState<boolean>(false);

    const handleShowPossibleValuesChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShowPossibleValues(event.target.checked);
    };

    return (
        <>
            <table className='game-table'>
                <tbody>
                    {field.getCells().map((row, rowIndex) => (
                        <tr className='game-table__row' key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td className='game-table__row__cell' key={cellIndex}>
                                    <CellView cell={cell} showPossibleValues={showPossibleValues} onChange={onChange} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <span> Show possible values</span>
            <input type='checkbox' value={`${showPossibleValues}`} onChange={handleShowPossibleValuesChange} />
        </>
    );
};

const CellView: React.FC<CellViewProps> = ({ cell, showPossibleValues, onChange }) => {
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
            {(!showPossibleValues || cell.getValue() !== DEFAULT_CELL_VALUE) && (
                <input
                    className={'game-table__row__cell__input' + (cell.isValid() ? '' : ' invalid-cell')}
                    onChange={(event) => handleCellValueChange(cell, event.target.value)}
                    value={cell.getValue() === DEFAULT_CELL_VALUE ? '' : cell.getValue()}
                />
            )}
            {showPossibleValues && <PossibleValuesView possibleValues={cell.getPossibleValues()} />}
        </>
    );
};

const PossibleValuesView: React.FC<PossibleValuesViewProps> = ({ possibleValues }) => {
    if (possibleValues.length === 0) {
        return null;
    }
    return (
        <div className='game-table__row__cell_possible-values'>
            {AVAILABLE_CELL_VALUES_FIELD.map((row, rowIndex) => (
                <div key={rowIndex} className='row m-0 p-0'>
                    {row.map((value) => (
                        <div className='game-table__row__cell_possible-value col-4 m-0'>
                            {possibleValues.includes(value) ? `${value}` : '-'}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SudokuTable;
