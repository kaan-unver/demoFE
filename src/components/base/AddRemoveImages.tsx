import { relative } from 'path';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Webcam from 'react-webcam';
import storefunc from '../../base/basefunctions/storefunc';
function AddRemoveImages(props: any) {
    const { t } = useTranslation();
    const [visibleCamera, setIsVisibleCamera] = useState<boolean>(false);
    const hideCamera = () => handleCameraVisibility(false);
    const handleCameraVisibility = (modalIsVisible: boolean) => setIsVisibleCamera(modalIsVisible);
    const [inputFields, setInputFields] = useState<any>([...props.files]);
    const [cameraDirection, setCameraDirection] = useState<any>(window.innerWidth < 1200 ? { exact: 'environment' } : 'user');
    useEffect(() => {
        setInputFields(props.files);
    }, [props.files]);

    const handleCameraDirection = () => {
        if (cameraDirection == 'user') {
            setCameraDirection({ exact: 'environment' });
        } else {
            setCameraDirection('user');
        }
    };
    const addInputField = async () => {
        await setInputFields([
            ...inputFields,
            {
                file: ''
            }
        ]);
    };
    const removeInputFields = (index: any) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
        props.setFiles(rows);
    };
    const capture = () => {
        const value = webcamRef.current.getScreenshot();
        if (value) {
            const item = {
                summary: t('success'),
                message: [t('photo.success')],
                severity: 'success',
                position: 'top',
                duration: 5000
            };
            storefunc.setStoreItems(item);
            inputFields.push({ file: value });
            const list = [...inputFields];
            list[list.length - 1].file = value;
            props.setFiles(list);
            setInputFields(list);
            // if (props.files[list.length - 1].file == '' && props.files.length > 1)
            //     removeInputFields(list.length - 1)
        }
    };
    // useEffect(() => { props.setFiles(inputFields) }, [inputFields])

    const webcamRef = React.useRef<any>(null);

    // const styles = {
    //     'width': inputFields.length !== 1 ? '90%' : '',
    //     'borderTopRightRadius': inputFields.length !== 1 ? 0 : '',
    //     'borderBottomRightRadius': inputFields.length !== 1 ? 0 : ''
    // }
    const addCardButtonStyle: any = {
        display: 'flex',
        border: '#034fa0 dashed 2px',
        background: 'rgba(0,0,0,0)',
        cursor: 'pointer',
        transition: 'all ease .5s',
        width: '100%',
        height: '150px'
    };
    const addCardTextStyle: any = {
        transition: 'all ease .5s',
        color: '#034fa0',
        position: 'relative',
        top: '45%',
        height: '20px'
    };
    // const [isButtonDisabled,setIsButtonDisabled] = useState<boolean>(false)
    //     useEffect(() => {
    //         if(visibleCamera){
    //         setTimeout(() => {
    //             setIsButtonDisabled(false)
    //         },1000)}else{
    //             setIsButtonDisabled(true)
    //         }
    //     },[visibleCamera])
    useEffect(() => {
            window.scrollTo(0, 1)
          }, [])
    return (
        <div className="container mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
            <Button style={{ width: '220px', height: '38px' }} label={t('add.photo')} icon="pi pi-camera" className={classNames('default-btn-demo mt-1')} onClick={() => setIsVisibleCamera(true)} />
            <div style={{ maxHeight: '220px', overflowX: 'auto', overflowY: 'hidden', marginTop: '12px' }} className="photo-overflow-box">
                <label htmlFor="name" className="mt-1">
                    {t('photos')}* ({inputFields[0] && inputFields[0].file == '' ? inputFields.length - 1 : inputFields.length})
                </label>
                <div className="row" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <label htmlFor="file">{props.header}</label>
                    {props.files.length > 0 &&
                        inputFields.map((data: any, index: any) => {
                            const { file } = data;
                            return (
                                <div className="row mb-0" key={index}>
                                    {/* <InputText style={{borderColor: inputFields[index].file.length > 0 ? props.duplicates.includes(file) ? 'red' : 'green' : ''  ,...styles}} id="file" value={file} onChange={(evnt)=>handleChange(index, evnt)} required  className={classNames({ 'p-invalid': props.submitted && !file && inputFields.length==1 })} /> */}
                                    {/* {inputFields.length==1 && props.submitted && !file && <small className="p-invalid">{t('required.field')}</small>} */}
                                    {/* {props.duplicates.includes(file) && <small className="p-invalid">Değerler eşit olamaz.</small>} */}
                                    {/* <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={file} file="fullName" className="form-control" /> */}
                                    <div style={{ width: '220px', position: 'relative' }}>
                                        {inputFields[index].file && <img src={inputFields[index].file} style={{ width: '100%', borderRadius: '5px' }}></img>}
                                        {inputFields[index].file && (
                                            <Button
                                                style={{ borderRadius: 0, borderBottomLeftRadius: '30%', borderTopRightRadius: '3px', position: 'absolute', top: 0, right: 0 }}
                                                icon="pi pi-trash"
                                                className="p-button-danger"
                                                onClick={(e) => removeInputFields(index)}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    {/* <div className="card justify-content-center info-card"
                            style={addCardButtonStyle}
                            onClick={() => setIsVisibleCamera(true)}
                        >
                            <span className="info-card-text" style={addCardTextStyle}><i className='pi pi-camera'></i> {t('add.photo')}</span>
                        </div> */}
                    <div className="row">
                        {visibleCamera && (
                            <Dialog visible={visibleCamera} style={{ width: '320px' }} modal className="p-fluid" onHide={hideCamera} headerStyle={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={'100%'}
                                    forceScreenshotSourceSize
                                    videoConstraints={{
                                        facingMode: cameraDirection
                                    }}
                                />
                                <Button
                                    // loading={isButtonDisabled}
                                    onClick={capture}
                                    style={{ position: 'absolute', top: '50%', right: '45px', height: '30px', width: '30px', borderRadius: '50%', aspectRatio: '1/1', border: 'none', backgroundColor: 'red', opacity: 0.3 }}
                                ></Button>
                                <Button onClick={handleCameraDirection} style={{ position: 'absolute', top: '75%', right: '45px', height: '30px', width: '30px', opacity: 0.3 }} icon="pi pi-sync"></Button>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
            {props.submitted && inputFields.length < 1 && (
                <small className="p-invalid" style={{ color: 'red' }}>
                    {t('required.field')}
                </small>
            )}
        </div>
    );
}
export default AddRemoveImages;
