import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import InputColor from 'react-input-color'
import InputColorStyles from 'react-input-color/dist/input-color.css'

export default React.createClass({
  mixins: [ampersandMixin],
  displayName: 'Label',
  getInitialState () {
    const {name, color} = this.props.label;

    return {
      name,
      color
    }
  },
  onEditClick (event) {
    event.preventDefault();
    this.props.label.editing = true;
  },
  onEditCancelClick (event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.isNew()) {
      label.destroy();
    } else {
      label.editing = false;
      this.setState(this.getInitialState());
    }
  },
  onDeleteClick (event) {
    event.preventDefault();
    this.props.label.destroy();
  },
  onNameChange (event) {
    this.setState({
      name: event.target.value
    });
  },
  onSaveClick (event) {
    event.preventDefault();
    const {label} = this.props;
    if (label.isNew()) {
      label.save(this.state, {
        success: function() {

        },
        error: function() {
          console.log(arguments);
        }
      });
    } else {
      label.save(this.state, {patch: true});
    }
    label.editing = false;
    label.saved = true;
  },
  onColorChange (color) {
    console.log(color);
    this.setState({
      color: color.slice(1)
    });
  },
  render () {
    const {label} = this.props
    const {color} = this.state
    const cssColor = '#' + color
    let content

    if (label.editing) {
      content = (
        <form className='label'>
          <span className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input name='name' onChange={this.onNameChange} value={this.state.name}/>
          <InputColor value={cssColor} onChange={this.onColorChange} />
          <button type='submit' onClick={this.onSaveClick} className='button button-small'>Save</button>

          <button type='button' className='button button-small button-unstyled'
             onClick={this.onEditCancelClick}>cancel</button>
        </form>
      );
    } else {
      content = (
        <div className='label'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name}</span>
          <span className='octicon octicon-pencil' onClick={this.onEditClick}></span>
          <span className='octicon octicon-x' onClick={this.onDeleteClick}></span>
        </div>
      );
    }

    return <div>{content}</div>;
  }
})