export declare class PhoneVerificationRenderer {
    private confirmationResult;
    private resendTimer;
    private countdown;
    private selectedCountry;
    private countries;
    render(): void;
    private setupListeners;
    setCountry(code: string): void;
    private initRecaptcha;
    private setBtnLoading;
    private startResendTimer;
    private handleSendOTP;
    private handleVerifyOTP;
}
