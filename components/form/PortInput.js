import {FormGroup, Label, Input } from 'reactstrap';

const PortInput = ({field, type,  label,  form: { touched, errors },...props }) => (
    <div>
        <FormGroup>
            <Label>{<label>{label}</label>} </Label>
            <Input type={type} {...field} {...props} />
            {touched[field.name] &&
            errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </FormGroup>
    </div>
);

export default PortInput;
