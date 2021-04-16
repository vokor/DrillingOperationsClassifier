import React, { Component} from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel
} from 'react-bootstrap';

export class LabeledSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <FormGroup key={`${this.props.id}-group`}>
                <FormLabel className="my-1 mr-2" htmlFor={this.props.id}>
                    {this.props.labelText}
                </FormLabel>
                <FormControl as="select" className="my-1 mr-sm-2" id={this.props.id} disabled={this.props.disabled} onChange={(e) => this.props.onChange(e)} custom>
                    { this.props.defaultOption && <option value={this.props.defaultOption.id}>{this.props.defaultOption.name}</option>}
                    { this.props.options && this.props.options.map(o => (<option value={o.id}>{o.name}</option>)) }
                </FormControl>
            </FormGroup>
        )
    }
}