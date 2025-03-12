import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import Storefunc from '../../base/basefunctions/storefunc';
import UserService from '../../service/UserService';
import { classNames } from 'primereact/utils';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};
const SignUp = (props: any) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [tel, setTel] = useState<any>();
    const isTelValid = isPhoneValid(tel);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [photo, setPhoto] = useState<any>('');
    const [inputType, setInputType] = useState<string>('password');

    function validateEmail(email: any) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }
    const addUser = () => {
        debugger;
        setSubmitted(true);
        if (firstName.trim() && lastName.trim() && isTelValid && validateEmail(email) && password) {
            setIsLoading(true);

            const companyUserService = new UserService();
            const formData: any = new FormData();
            formData.append('Email', email), formData.append('Password', password), formData.append('FirstName', firstName);
            formData.append('MiddleName', middleName ?? middleName);
            formData.append('LastName', lastName);
            formData.append('PhoneNumber', tel);
            formData.append('ProfilePhoto', photo ?? photo);
            companyUserService
                .addUser(formData)
                .then((response: any) => {
                    const item = {
                        summary: t('success'),
                        message: [t('operation.success')],
                        severity: 'success',
                        position: 'top',
                        duration: 5000,
                        type: response.config.url
                    };
                    Storefunc.setStoreItems(item);
                    props.setSignUpVisible(false);
                    setEmail('');
                    setPassword('');
                    setFirstName('');   
                    setMiddleName('');
                    setLastName('');
                    setTel('');
                    setPhoto('');
                    setInputType('password')
                    setSubmitted(false)
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    const item = {
                        summary: t('fail'),
                        message: error.data.messages,
                        severity: 'error',
                        position: 'top',
                        duration: 5000
                    };
                    Storefunc.setStoreItems(item);
                });
        }
    };
    function passwordVisible() {
        let beholder = document.getElementById('beholder')
        if(beholder?.classList.contains('pi-eye')){
            beholder?.classList.remove('pi-eye');
            beholder?.classList.add('pi-eye-slash');
            setInputType('text')
        }else{
            beholder?.classList.remove('pi-eye-slash');
            beholder?.classList.add('pi-eye');
            setInputType('password')
        }
    }
    return (
        <div className="login-box" style={{ display: props.signUpVisible ? '' : 'none' }}>
            <img src={`assets/login/logo.png`} alt="logo" style={{ width: '400px', marginBottom: '10px' }} />
            <div>
                <Button
                    label={t('back')}
                    icon="pi pi-chevron-left"
                    className="p-button-text p-button-secondary mb-2 mr-2"
                    onClick={() => {
                        props.setSignUpVisible(false);
                    }}
                />

                <div className="field">
                    <label>{t('first.name')}*</label>
                    <span>
                        <InputText id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value.trim())} className={classNames({ 'p-invalid': submitted && !firstName }, 'w-full')} />
                    </span>
                    {submitted && !firstName && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field">
                    <label>{t('middle.name')}</label>
                    <span>
                        <InputText id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="w-full" />
                    </span>
                </div>
                <div className="field">
                    <label>{t('last.name')}*</label>
                    <span>
                        <InputText id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value.trim())} className={classNames({ 'p-invalid': submitted && !lastName }, 'w-full')} />
                    </span>
                    {submitted && !lastName && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field">
                    <label htmlFor="tel">{t('companyuser.phone')}*</label>
                    <PhoneInput
                        defaultCountry="tr"
                        value={tel}
                        onChange={(tel) => setTel(tel)}
                        forceDialCode={true}
                        inputClassName="p-inputtext w-full"
                        style={submitted && (!tel || (tel && !isTelValid)) ? { border: '1px solid #FC6161', borderRadius: 4 } : {}}
                    />
                    {submitted && !tel && <small className="p-invalid">{t('required.field')}</small>}
                    {submitted && tel && !isTelValid && <small className="p-invalid">{t('invalid.phone')}</small>}
                </div>
                <div className="field">
                    <label>{t('email')}*</label>
                    <span>
                        <InputText id="emailSU" required value={email} onChange={(e) => setEmail(e.target.value.trim())} className={classNames({ 'p-invalid': submitted && !email }, 'w-full')} />
                    </span>
                    {submitted && !email && <small className="p-invalid">{t('required.field')}</small>}
                    {submitted && email && !validateEmail(email) && <small className="p-invalid">{t('invalid.email')}</small>}
                </div>
                <div className="field">
                    <label>{t('password')}*</label>
                    <span className="p-input-icon-right w-full">
                        <i id='beholder' className="pi pi-eye" style={{cursor:'pointer'}} onClick={() => {passwordVisible()}}></i>
                        <InputText id="passwordSU" type={inputType} required value={password} onChange={(e) => setPassword(e.target.value.trim())} className={classNames({ 'p-invalid': submitted && !password }, 'w-full')} />
                    </span>
                    {submitted && !password && <small className="p-invalid">{t('required.field')}</small>}
                </div>
                <div className="field">
                    <label>{t('profile.photo')}</label>
                    <span>
                        <div style={{ border: '1px solid #249ee4', borderRadius: '5px' }}>
                            <input className="my-4 mx-2" type="file" accept="image/png, image/jpeg" onChange={(e: any) => setPhoto(e.target.files[0])} />
                        </div>
                    </span>
                </div>
            </div>
            {/* <button className="flex p-link">Forgot your password?</button> */}
            <div className="button-container">
                <Button
                    className="login-demo-btn"
                    label={t('sign.up')}
                    loading={isLoading}
                    onClick={() => {
                        addUser();
                    }}
                />
            </div>
        </div>
    );
};

export default SignUp;
