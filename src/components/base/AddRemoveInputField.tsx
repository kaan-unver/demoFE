import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
function AddRemoveInputField(props: any) {
    const { t } = useTranslation();
    const [inputFields, setInputFields] = useState([
        {
            name: ''
        }
    ]);

    const addInputField = () => {
        setInputFields([
            ...inputFields,
            {
                name: ''
            }
        ]);
    };
    const removeInputFields = (index: any) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    };
    const handleChange = (index: any, evnt: any) => {
        const { value } = evnt.target;
        const list = [...inputFields];
        list[index].name = value;
        props.setNames(list);
        setInputFields(list);
        if (props.names[index].name == '' && props.names.length > 1) removeInputFields(index);
    };
    useEffect(() => {
        props.setNames(inputFields);
    }, [inputFields]);

    const styles = {
        width: inputFields.length !== 1 ? '90%' : '',
        borderTopRightRadius: inputFields.length !== 1 ? 0 : '',
        borderBottomRightRadius: inputFields.length !== 1 ? 0 : ''
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <label htmlFor="name">{props.header}</label>
                    {inputFields.map((data, index) => {
                        const { name } = data;
                        return (
                            <div className="row my-3" key={index}>
                                <InputText
                                    style={{ borderColor: inputFields[index].name.length > 0 ? (props.duplicates.includes(name) ? 'red' : 'green') : '', ...styles }}
                                    id="name"
                                    value={name}
                                    onChange={(evnt) => handleChange(index, evnt)}
                                    required
                                    
                                    className={classNames({ 'p-invalid': props.submitted && !name && inputFields.length == 1 })}
                                />
                                {inputFields.length !== 1 && <Button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} icon="pi pi-trash" className="p-button-danger" onClick={(e) => removeInputFields(index)} />}
                                {inputFields.length == 1 && props.submitted && !name && <small className="p-invalid">{t('required.field')}</small>}
                                {props.duplicates.includes(name) && <small className="p-invalid">Değerler eşit olamaz.</small>}
                                {/* <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={name} name="fullName" className="form-control" /> */}
                            </div>
                        );
                    })}

                    <div className="row">
                        <Button
                            style={{ width: 'auto' }}
                            disabled={props.names.at(-1).name.length < 1}
                            label={props.label}
                            icon="pi pi-plus"
                            className={classNames(props.names.at(-1).name.length < 1 ? 'p-button-secondary' : 'p-button-success')}
                            onClick={addInputField}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddRemoveInputField;
