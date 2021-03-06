import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PortInput from '../form/PortInput';
import PortDate from '../form/PortDate';
import {Button, Alert} from 'reactstrap'

import moment from 'moment';

const validateInputs = (values) => {
    let errors = {};

    Object.entries(values).forEach(([key, value]) => {
        if (!values[key] && key !== 'endDate') {
            errors[key] = `Field ${key} is required!`;
        }
    });

    const startDate = moment(values.startDate);
    const endDate = moment(values.endDate);

    if (startDate && endDate && endDate.isBefore(startDate)) {
        errors.endDate = 'End Date cannot be before start date!!!';
    }

    return errors;
}

const PortfolioCreateForm = ({initialValues, onSubmit, error}) => (
    <div>
        <Formik
            initialValues={initialValues}
            validate={validateInputs}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        label="Title"
                        type="text"
                        name="title"
                        component={PortInput}
                    />
                    <Field
                        label="Entreprise"
                        type="text"
                        name="company"
                        component={PortInput}
                    />
                    <Field
                        label="Localisation"
                        type="text"
                        name="location"
                        component={PortInput}
                    />
                    <Field
                        label="Poste"
                        type="text"
                        name="position"
                        component={PortInput}
                    />
                    <Field
                        label="Description"
                        type="textarea"
                        name="description"
                        component={PortInput}
                    />
                    <Field
                        label="Date de ébut"
                        name="startDate"
                        initialDate={initialValues.startDate}
                        component={PortDate} />
                    <Field
                        label="Date de fin"
                        name="endDate"
                        canBeDisabled={true}
                        initialDate={initialValues.endDate}
                        component={PortDate} />
                    {error &&
                    <Alert color="danger">
                        {error}
                    </Alert>}
                    <Button outline color="success" size="lg" type="submit" disabled={isSubmitting}>
                        Créer
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioCreateForm;
