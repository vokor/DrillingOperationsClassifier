import React from 'react'
import {Button, Form, FormGroup} from "react-bootstrap";
import axios from 'axios'

import {LabeledSelect} from "./base/LabeledSelect";

const day_parts = [
    {id:'morning',name:'Утро'},
    {id:'afternoon',name:'День'},
    {id:'evening',name:'Вечер'},
    {id:'night',name:'Ночь'},
]

export default class ComboBoxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            wells: [],
            drill_dates: [],
            wells_disabled: true,
            search_disabled: true,
            dates_disabled: true,
            well_id: null,
            day_part: null,
            date_drill: null,
        }
        this.branchChoose = this.branchChoose.bind(this);
        this.wellChoose = this.wellChoose.bind(this);
        this.dayPartChoose = this.dayPartChoose.bind(this);
        this.drillDateChoose = this.drillDateChoose.bind(this);
    }

    branchChoose(e) {
        let value = e.target.value;
        axios({
            method: "GET",
            url: `http://localhost:8000/api/wells/?format=json&branch_id=${value}`,
            mode: 'no-cors'
        }).then(
            data => {
                console.log(data);
                if (data.data.length > 0) {
                    this.setState({
                        wells: data.data,
                        drill_dates: [],
                        wells_disabled: false,
                        search_disabled: true,
                        dates_disabled: true,
                    });
                } else {
                    this.setState({
                        wells: [],
                        drill_dates: [],
                        wells_disabled: true,
                        search_disabled: true,
                        dates_disabled: true,
                    });
                    if (this.props.hasOwnProperty('updateWellInfo')) {
                        this.props.updateWellInfo(null);
                    }
                }
            }
        )
    }

    wellChoose(e) {
        let value = e.target.value;
        if (value==="0") {
            this.setState({
                search_disabled:true,
            });
        } else {
            axios({
                method: "GET",
                url: `http://localhost:8000/api/drilldates/?format=json&well_id=${value}`,
                mode: 'no-cors',
            }).then(
                data => {
                    console.log(data);
                    this.setState({
                        well_id: value,
                        search_disabled: false,
                        dates_disabled: false,
                        drill_dates: data.data.drill_dates,
                    });
                }
            )
            if (this.props.hasOwnProperty('updateWellInfo')) {
                axios({
                    method: "GET",
                    url: `http://localhost:8000/api/wells/${value}/?format=json`,
                    mode: 'no-cors',
                }).then(
                    data => {
                        this.props.updateWellInfo(data.data);
                    }
                )
            }
        }
    }

    dayPartChoose(e) {
        let value = e.target.value;
        this.setState({day_part:value});
    }

    drillDateChoose(e) {
        let value = e.target.value;
        if (value === '0') {
            this.setState({
                drill_date:null,
            });
        } else {
            this.setState({
                drill_date:value,
            });
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/branches/?format=json",
            mode: 'no-cors',
        }).then(
            data => {
                console.log(data);
                this.setState({branches: data.data});
            }
        )
    }

    render() {
        return (
            <Form inline>
                <LabeledSelect disabled={false} id="branch-combo" labelText="Филиал" options={this.state.branches} onChange={(e) => this.branchChoose(e)} defaultOption={{id:"0",name:"Не выбрано"}}/>
                <LabeledSelect disabled={this.state.wells_disabled} id="well-combo" options={this.state.wells} onChange={(e) => this.wellChoose(e)} labelText="Скважина" defaultOption={{id:"0",name:"Не выбрано"}}/>
                <LabeledSelect disabled={this.state.dates_disabled} id="drill-date-combo" labelText="Дата" options={this.state.drill_dates} onChange={(e) => this.drillDateChoose(e)} defaultOption={{id:"0",name:"Не выбрано"}}/>
                <LabeledSelect disabled={false} id="day-part-combo" labelText="Время суток" onChange={(e) => this.dayPartChoose(e)} options={day_parts} defaultOption={{id:"full",name:"Сутки"}}/>
                <FormGroup key={'update-table-contents-button'}>
                    <Button type="submit" className="my-1" disabled={this.state.search_disabled} onClick={(e) => this.props.updateTableContents(e,this.state)}>
                      Найти операции
                    </Button>
                </FormGroup>
            </Form>
        )
    }
}
