
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IFormValues } from '../../utils/interfaces';
import Loading from '../Loading';

const sizesPdf = ["Letter", "Legal", "Tabloid", "Ledger", "A0", "A1", "A2", "A3", "A4", "A5", "A6"]

interface IProps {
    onSubmit: Function;
    valuesForm?: IFormValues;
    loading?: boolean;
}

interface IErrors {
    url?: string;
    name?: string;
    size?: string;
}

const initialFormState: IFormValues = {
    url: "",
    name: "",
    size: "A3"
}

const findFormErrors = (form: IFormValues) => {
    const { url } = form
    const newErrors: IErrors = {}

    if (!url || url === '') newErrors.url = 'Cannot be blank!'

    return newErrors
}

const FormLogin: React.FC<IProps> = ({ onSubmit, valuesForm, loading }) => {
    const [formState, setFormState] = useState<IFormValues>(valuesForm || initialFormState)
    const [errors, setErrors] = useState<IErrors>({})

    const onChangeForm = (currentValues: IFormValues, errors: IErrors, e: any) => {
        const { name, value } = e.target

        setFormState({ ...currentValues, [name]: value })

        // Check and see if errors exist, and remove them from the error object:  
        if (!!errors[name as keyof IErrors]) setErrors({
            ...errors,
            [name]: null
        })
    }

    const onFormSubmit = (e: any, formValues: IFormValues) => {
        e.preventDefault()
        const newErrors = findFormErrors(formValues)
        if (Object.keys(newErrors).length) {
            setErrors(newErrors)
        } else {
            onSubmit(formValues)
        }
    }

    return (
        <div className="getPdfForm">
            <Form noValidate onSubmit={(e) => onFormSubmit(e, formState)}>
                <Form.Group controlId="url">
                    <Form.Label>Url *</Form.Label>
                    <Form.Control
                        required
                        name="url"
                        type="string"
                        onChange={e => onChangeForm(formState, errors, e)}
                        isInvalid={!!errors.url}
                        value={formState.url}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.url}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control
                        required
                        name="name"
                        type="string"
                        onChange={e => onChangeForm(formState, errors, e)}
                        value={formState.name}
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={e => onChangeForm(formState, errors, e)}
                        name="size"
                        value={formState.size}
                    >
                        {sizesPdf.map(size => <option key={size} value={size}>{size}</option>)}
                    </Form.Control>
                </Form.Group>
                <Button block size="lg" type="submit" disabled={loading} style={{ height: "65px" }}>
                    {loading && <Loading />}
                    <span>Download</span>
                </Button>
            </Form>
        </div >
    );
}

export default FormLogin;