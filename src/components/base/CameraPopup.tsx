import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { exact } from 'prop-types';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Webcam from 'react-webcam';

const CameraPopup = (props: any) => {
    const isDesktop = () => {
        return window.innerWidth > 1023;
    };
    const isVerticalScreen = () => {
        return window.innerWidth < 840;
    };
    const webcamRef = React.useRef<any>(null);
    const [cameraDirection, setCameraDirection] = useState<any>(window.innerWidth < 1200 ? { exact: 'environment' } : 'user');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    setTimeout(() => {
        setIsButtonDisabled(false);
    }, 1000);
    const handleCameraDirection = () => {
        if (cameraDirection == 'user') {
            setCameraDirection({ exact: 'environment' });
        } else {
            setCameraDirection('user');
        }
    };
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
                if (props.personFormCamera && isVerticalScreen()) {
                    props.setImage(imageSrc);
                } else if (props.personFormCamera && !isVerticalScreen()) {
                    rotateImage(imageSrc, 90, (url: any) => {
                        props.setImage(url);
                    });
                } else if (isVerticalScreen() && !props.personFormCamera && window.innerWidth > 600) {
                    cropImage(imageSrc, 248, 397, 77, 67, (res: any) => {
                        rotateImage(res, 90, (url: any) => {
                            props.setImage(url);
                        });
                    });
                }else if (isVerticalScreen() && !props.personFormCamera && window.innerWidth < 600) {
                        cropImage(imageSrc, 198, 332, 77, 70, (res: any) => {
                            rotateImage(res, 90, (url: any) => {
                                props.setImage(url);
                            });
                        });
                } else {
                    cropImage(imageSrc, 248, 157, 77, 67, (res: any) => {
                        props.setImage(res);
                    });
                }
            props.hideDialog();
        }

    }, [webcamRef, props.setImage]);

    function getDimensions(image: string) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;

            img.onload = () => {
                resolve({ width: img.width, height: img.height })
            }
        })
    }

    function rotateImage(imageBase64: any, rotation: any, cb: any) {
        var img = new Image();
        img.src = imageBase64;
        img.onload = () => {
            var canvas = document.createElement('canvas');
            const maxDim = Math.max(img.height, img.width);
            if ([90, 270].indexOf(rotation) > -1) {
                canvas.width = img.height;
                canvas.height = img.width;
            } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }
            var ctx: any = canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, img.height / 2, img.width / 2);
            ctx.rotate(rotation * (Math.PI / 180));
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            cb(canvas.toDataURL('image/jpeg'));
        };
    }
    const cropImage = (imageBase64: any, w: any, h: any, x: any, y: any, cb: any) => {
        var img = new Image();
        img.src = imageBase64;
        img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            var ctx: any = canvas.getContext('2d');
            ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
            cb(canvas.toDataURL('image/jpeg'));
        };
    };
    const [width, height] = useWindowSize();
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    useEffect(() => {
        window.scrollTo(0, 1)
      }, [])
    return (
        <Dialog visible={props.visibleModal} style={{ width: '450px' }} contentStyle={{overflowY:'hidden'}} modal className="p-fluid" onHide={props.hideDialog} headerStyle={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
            {/* <span>{isVerticalScreen().toString()}</span> */}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={'100%'}
                forceScreenshotSourceSize={props.personFormCamera || false}
                videoConstraints={{
                    facingMode: cameraDirection
                }}
            />
            {window.innerWidth > 841 && !props.personFormCamera && <div style={{ position: 'absolute', top: '130px', left: '100px', height: '160px', width: '250px', border: '1px solid red', backgroundColor: 'none', opacity: '0.5' }}></div>}
            {window.innerWidth < 840 && window.innerWidth > 600 && !props.personFormCamera && <div style={{ position: 'absolute', top: '130px', left: '100px', height: '400px', width: '250px', border: '1px solid red', backgroundColor: 'none', opacity: '0.5' }}></div>}
            {window.innerWidth < 600 && !props.personFormCamera && <div style={{ position: 'absolute', top: '130px', left: '100px', height: '335px', width: '200px', border: '1px solid red', backgroundColor: 'none', opacity: '0.5' }}></div>}
            {/* {!props.isVertical && <div style={{ position: 'absolute', top: '130px', left: '100px', height: '160px', width: '250px', border: '1px solid red', backgroundColor: 'none', opacity: '0.5' }}></div>} */}
            <Button
                loading={isButtonDisabled}
                onClick={capture}
                style={{ position: 'absolute', top: '50%', right: '45px', height: '30px', width: '30px', borderRadius: '50%', aspectRatio: '1/1', border: 'none', backgroundColor: 'red', opacity: 0.3 }}
            ></Button>
            <Button onClick={handleCameraDirection} style={{ position: 'absolute', top: '75%', right: '45px', height: '30px', width: '30px', opacity: 0.3 }} icon="pi pi-sync"></Button>
        </Dialog>
    );
};

export default CameraPopup;
