import logo from './drilling.svg';
import user from './User_icon_2.svg'
import './App.css';

import {useState} from 'react'

import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  SplitButton,
  Dropdown
} from 'react-bootstrap';

import ComboBoxes from './components/ComboBoxes'
import DrillingsTable from './components/Table'

import Context from "./Context";
import axios from "axios";

function makeFilter(params,props) {
  let filter = '';
  props.forEach((property,idx) => {
    if (params.hasOwnProperty(property)) {
      if (params[property]) {
        filter += `&${property}=${params[property]}`;
      }
    }
  })
  return filter;
}

function App() {
  const [tableContents,setTableContents] = useState([]);
  const [wellInfo,setWellInfo] = useState(null);
  const [theme,setTheme] = useState('light');

  function updateTableContents(evt,params) {
    evt.preventDefault();
    axios({
      method: "GET",
      url: `/api/drillings/?format=json${makeFilter(params,['well_id', 'day_part', 'drill_date'])}`
    }).then(
        data => {
          const res = data.data;
          if (res.success) {
            console.log(res);
            setTableContents(res.drillings);
          } else {
            setTableContents([]);
          }
        }
    )
  }

  function updateWellInfo(well_info) {
    setWellInfo(well_info);
  }

  function formatWellInfo(wellinfo) {
    return (
        <>
          {wellinfo.drill_start_date}
          &nbsp;
          {wellinfo.drill_start_time}
          &nbsp;
          -
          &nbsp;
          {wellinfo.drill_end_date}
          &nbsp;
          {wellinfo.drill_end_time}
        </>
    )
  }

  return (
    <Context.Provider value={{}}>
      <Navbar bg={theme} variant={theme} sticky="top">
        <Navbar.Brand href="#home">
          <img
              src={logo}
              width="45"
              height="45"
              className="d-inline-block align-center"
              alt="Логотип"
          />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Text className="ml-auto mr-auto font-weight-bold">АВТОМАТИЧЕСКОЕ ИЗМЕРЕНИЕ ОПЕРАЦИЙ БУРЕНИЯ СКВАЖИН</Navbar.Text>
          <Nav className="justify-content-right">
            <SplitButton
                drop={"down"}
                title={<>
                  <Navbar.Text>
                    <img
                      src={user}
                      width="30"
                      height="30"
                      className="d-inline-block align-center"
                      alt="Логотип"
                    />
                  </Navbar.Text>
                  <Navbar.Text className="text-white">Владимир Королихин</Navbar.Text>
                </>}
                id="dropdown-menu-align-responsive-2">
              <Dropdown.Item eventKey="1" onClick={(e) => {
                e.preventDefault();
                setTheme((theme==='light')?'dark':'light');
              }}>Сменить тему</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item eventKey="2">Выйти</Dropdown.Item>
            </SplitButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row className={"pb-3 pt-3"}>
          <Col md={{ span: 8, offset: 2 }}>
            <ComboBoxes updateTableContents={(evt,params) => {updateTableContents(evt,params)}} updateWellInfo={(info) => {updateWellInfo(info)}}/>
          </Col>
        </Row>
        <Row className={"pb-3"}>
          <Col md="auto"><h5>Интервал строительства скважины:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ wellInfo && formatWellInfo(wellInfo) }</h5></Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="operations">
              <Tab eventKey="operations" title="Операции">
                {
                  tableContents && <DrillingsTable rows={tableContents}/>
                }
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </Context.Provider>
  );
}

export default App;
