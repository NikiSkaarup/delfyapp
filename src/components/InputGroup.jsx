import React, { Component } from 'react';

class InputGroup extends Component {

    generateInput = (props) => {
        if (props.type !== 'textarea') {
            return (<input
                type={props.type}
                name={props.id}
                id={props.id}
                onChange={this.props.onChange}
                placeholder={props.title}
                value={props.value} />);
        } else {
            return (<textarea
                name={props.id}
                id={props.id}
                onChange={this.props.onChange}
                placeholder={props.title}
                value={props.value} />)
        }
    }

    render() {
        return (
            <div className="input-group">
                {this.props.title !== undefined &&
                    (<label htmlFor={this.props.id}>{this.props.title}</label>)}
                {this.generateInput(this.props)}
            </div>
        );
    }
}

export default InputGroup;
