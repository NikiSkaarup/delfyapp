import React, { Component } from 'react';

class InputGroup extends Component {
    render() {
        return (
            <div className="input-group">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input
                    type={this.props.type}
                    name={this.props.id}
                    id={this.props.id}
                    onChange={this.props.onChange}
                    placeholder={this.props.title}
                    value={this.props.value} />
            </div>
        );
    }
}

export default InputGroup;
