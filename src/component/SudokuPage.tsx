import React, { createContext, useCallback, useState } from 'react';
import { TableView } from './controls/table/TableView';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';
import { FieldControlPanel } from './controls/controlPanel';
import { Col, Row } from 'react-bootstrap';
import { EventsDisplay } from './controls/eventsDisplay';

interface SudokuContextProps {
    field: Sudoku;
    setField: (field: Sudoku) => void;
    rerender: () => void;
    rerenderAsync: () => Promise<void>;
}

export const SudokuContext = createContext<SudokuContextProps>({
    field: new ClassicSudoku(),
    setField: () => {},
    rerender: () => {},
    rerenderAsync: () => Promise.resolve(),
});

export const SudokuPage: React.FC = () => {
    const [field, setField] = useState<Sudoku>(new ClassicSudoku());
    const [, updateState] = useState<object>();

    const rerender = () => updateState({});

    const rerenderAsync = useCallback(() => {
        return new Promise<void>((resolve) => {
            updateState({});
            resolve();
        });
    }, []);

    return (
        <SudokuContext.Provider value={{ field, setField, rerender: rerender, rerenderAsync: rerenderAsync }}>
            <Row>
                <Col>
                    <TableView />
                    <FieldControlPanel />
                </Col>
                <Col>
                    <EventsDisplay />
                </Col>
            </Row>
        </SudokuContext.Provider>
    );
};
