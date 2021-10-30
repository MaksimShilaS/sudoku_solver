import { SudokuContextProvider } from './component/SudokuContext';
import { SudokuPage } from './component/SudokuPage';

const containerStyles: React.CSSProperties = {
    paddingLeft: '8%',
    paddingRight: '8%',
};

function App() {
    return (
        <div style={containerStyles}>
            <SudokuContextProvider>
                <SudokuPage />
            </SudokuContextProvider>
        </div>
    );
}

export default App;
