import React from 'react';

const AppFooter = (props: any) => {
    return (
        <div className="layout-footer">
            <div className="logo-box">
                <img src={`assets/layout/images/Demo.png`} alt="Demo-logo" style={{ height: '40px' }} />
                <img id="footer-logo" src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="marifet-logo" style={{ height: '20px' }} />
            </div>
        </div>
    );
};

export default AppFooter;
