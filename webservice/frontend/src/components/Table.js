import BootstrapTable from 'react-bootstrap-table-next';

import {Component} from 'react'

import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { selectFilter,textFilter } from 'react-bootstrap-table2-filter';

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

function techParamsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        <>
            {
                cell.map(p => {
                    return (<>{p}<br/></>);
                })
            }
        </>
    );
}

function fcFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        <>{rowIndex}</>
    );
}

function operationFormatter(cell, row, rowIndex, formatExtraData) {
    console.log(cell);
    if (cell) {
        return (
            <span>{cell.name}</span>
        );
    } else {
        return (
            <></>
        );
    }
}

const MyExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
    );
};

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

export default class DrillingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const columns = [
            {
                dataField: 'id',
                text: '№',
                formatter: fcFormatter,
                hidden: true,
                csvExport: false
            },
            {
                dataField: 'drill_date',
                text: 'Дата',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "110px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'time_start',
                text: 'Начало (время)',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "110px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'time_end',
                text: 'Окончание (время)',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "110px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'duration',
                text: 'Длительность (мин)',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'chisel_depth_start',
                text: 'Глубина долота на начало операции',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'chisel_depth_end',
                text: 'Глубина долота на начало операции',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'candles_amount',
                text: 'Количество свечей',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'operation',
                text: 'Операция',
                sort: true,
                headerAlign: 'center',
                headerStyle: {
                    verticalAlign: 'middle'
                },
                formatter: operationFormatter,
                csvFormatter: (cell, row, rowIndex) => `${(cell) ? cell.name : ''}`,
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            backgroundColor: cell.color,
                            verticalAlign: 'middle',
                        };
                    }
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "280px;"
                }),
                headerSortingStyle
            },
            {
                dataField: 'tech_params',
                text: 'Тех. параметры',
                headerAlign: 'center',
                headerStyle: {
                    verticalAlign: 'middle'
                },
                formatter: techParamsFormatter,
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                            fontSize: 'xx-small'
                        };
                    }
                },
                /*attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "110px;"
                })*/
            },
            {
                dataField: 'slaughter_depth_start',
                text: 'Глубина забоя на начало операции',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'slaughter_depth_end',
                text: 'Глубина забоя на окончание операции',
                headerAlign: 'center',
                sort: true,
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            },
            {
                dataField: 'source',
                text: 'Источник',
                sort: true,
                headerAlign: 'center',
                headerStyle: {
                    verticalAlign: 'middle'
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'center';
                },
                attrs: (cell, row, rowIndex, colIndex) => ({
                    'width': "80px;"
                }),
                style: (cell, row, rowIndex, colIndex) => {
                    if (cell) {
                        return {
                            verticalAlign: 'middle',
                        };
                    }
                },
                headerSortingStyle
            }
        ];
        const paginationOption = {
            custom: true,
            totalSize: this.props.rows.length
        };
        return (
                <PaginationProvider  pagination={ paginationFactory(paginationOption) }>
                {
                    ({
                         paginationProps,
                         paginationTableProps
                     }) => (
                        <>
                            <ToolkitProvider
                                keyField="id"
                                data={ this.props.rows }
                                columns={ columns }
                                bootstrap4
                                search
                                exportCSV={ {
                                    fileName: `drillings_report.csv`,
                                    separator: ',',
                                    ignoreHeader: false,
                                    noAutoBOM: true
                                } }
                            >
                            {
                                props => (
                                    <>
                                        <SizePerPageDropdownStandalone
                                            { ...paginationProps }
                                        />
                                        <PaginationTotalStandalone
                                            { ...paginationProps }
                                        />
                                        <br/>
                                        <MyExportCSV { ...props.csvProps } />
                                        <hr />
                                        <SearchBar { ...props.searchProps } />
                                        <hr />
                                        <BootstrapTable
                                        {...props.baseProps}
                                        {...paginationTableProps}
                                        striped
                                        bordered
                                        hover
                                        condensed
                                        //filter={ filterFactory() }
                                        />
                                        <PaginationListStandalone
                                            { ...paginationProps }
                                        />
                                    </>
                                )
                            }
                            </ToolkitProvider>
                        </>
                    )
                }
                </PaginationProvider>
        )
    }
}