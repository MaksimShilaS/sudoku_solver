import { Container } from 'react-bootstrap';
import { SudokuPage } from './component/SudokuPage';

const containerStyles: React.CSSProperties = {
    paddingLeft: '8%',
    paddingRight: '8%',
};

function App() {
    return (
        <div style={containerStyles}>
            <SudokuPage />
        </div>
    );
}

export default App;
