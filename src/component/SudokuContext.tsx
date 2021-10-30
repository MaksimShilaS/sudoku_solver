import { createContext, useCallback, useState } from 'react';
import { ClassicSudoku, Sudoku } from '../app/Sudoku';

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

export const SudokuContextProvider: React.FC = ({ children }) => {
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
            {children}
        </SudokuContext.Provider>
    );
};
