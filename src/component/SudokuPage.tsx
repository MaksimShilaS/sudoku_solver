import React from 'react';
import FieldControlPanel from './controls/FieldControlPanel';
import { Col, Row } from 'react-bootstrap';
import { TableView } from './controls/table/TableView';

export const SudokuPage: React.FC = () => {
    return (
        <Row className='mt-4'>
            <Col>
                <TableView />
            </Col>
            <Col>
                <FieldControlPanel />
            </Col>
        </Row>
    );
};
