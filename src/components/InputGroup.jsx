import React, { Component } from 'react';

class InputGroup extends Component {

    generateInput = (props) => {
        if (props.type !== 'textarea') {
            return (<input
                data-type={props.dataType}
                type={props.type}
                name={props.id}
                id={props.id}
                onChange={this.props.onChange}
                autoFocus={props.autoFocus}
                placeholder={props.title}
                value={props.value} />);
        } else {
            return (<textarea
                data-type={props.dataType}
                name={props.id}
                id={props.id}
                onChange={this.props.onChange}
                autoFocus={props.autoFocus}
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
