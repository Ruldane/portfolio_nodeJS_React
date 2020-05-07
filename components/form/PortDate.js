import React from 'react';
import DatePicker from 'react-datepicker';
import { FormGroup, Label, Button } from 'reactstrap';

import moment from 'moment';

export default class PortDate extends React.Component {

    constructor(props) {
        const isHidden = !props.initialDate;

        super(props);
        this.state = {
            dateValue: new Date(),
            isHidden: isHidden
        };
    }

    setFieldValueAndTouched (date, touched){
        const { setFieldValue, setFieldTouched } = this.props.form;
        const { name } = this.props.field;

        setFieldValue(name, date, true);
        setFieldTouched(name, touched, true);
    }

    handleChange = date => {


        this.setState({
            dateValue: date
        });
        this.setFieldValueAndTouched(date, true);
    };

    toggleDate(date){
        this.setState({
            isHidden: !this.state.isHidden
        })
        this.setFieldValueAndTouched(date, true);
    }

    render() {
        const {
            label,
            field,
            form: { touched, errors },
            canBeDisabled,
        } = this.props;
        const {isHidden, dateValue}= this.state;

        return (
            <FormGroup>
                <Label>{label}</Label>
                <div className="input-group">
                    { !isHidden &&
                    <DatePicker
                            selected = {dateValue}
                            onChange={this.handleChange}
                            peekNextMounth
                            showMonthDropdown
                            showYearDropdown
                            maxDate={moment()}
                            dropdownMode="select"
                    />
                    }
                </div>
                    {canBeDisabled && !isHidden && <Button onClick={()=>this.toggleDate(null)}>Still Working here</Button> }
                {canBeDisabled && isHidden &&
                    <React.Fragment>
                        <span>Still Workinng here</span>
                        <Button onClick={()=>this.toggleDate(dateValue)}>set End Date</Button>
                    </React.Fragment>
                }
                    {touched[field.name] && errors[field.name] && (
                        <div className="error">{errors[field.name]}</div>
                    )}
            </FormGroup>
        );
    }
}
