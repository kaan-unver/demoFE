class GeneratePasswordFunc {
    generatePassword = () => {
        let charset = '';
        let newPassword = '';
        charset += '!@#$%^&*()';
        charset += '0123456789';
        charset += 'abcdefghijklmnopqrstuvwxyz';
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 10; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return newPassword;
    };
}
export default new GeneratePasswordFunc();
