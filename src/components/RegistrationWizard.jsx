import { useState } from 'react';

export default function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleSubmit = () => {
    console.log("Finalized Payload:", formData);
    setIsSuccess(true);
  };

  const isStep1Valid =
    formData.firstName !== '' &&
    formData.lastName !== '' &&
    formData.dob !== '';

  const hasEmailError = formData.email !== '' && !formData.email.includes('@');
  const hasPasswordError = formData.password !== '' && formData.password.length < 8;
  const hasConfirmError = formData.confirmPassword !== '' && formData.confirmPassword !== formData.password;

  const isStep2Valid =
    formData.email.includes('@') &&
    formData.password.length >= 8 &&
    formData.confirmPassword === formData.password;

  return (
    <div className="simple-wizard-container">
      {!isSuccess && <h3>Step {currentStep} of 3</h3>}

      {isSuccess && (
        <div className="success-message">
          <h2>Success!</h2>
          <p>Your account has been created successfully.</p>
          <button onClick={() => window.location.reload()}>Start Over</button>
        </div>
      )}

      {currentStep === 1 && !isSuccess && (
        <div>
          <h2>Personal Info</h2>

          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>

          <button onClick={handleNext} disabled={!isStep1Valid}>
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && !isSuccess && (
        <div>
          <h2>Account Details</h2>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {hasEmailError && <span className="error-text">Email must contain an "@" symbol</span>}
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button className='showpass' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            {hasPasswordError && <span className="error-text">Password must be at least 8 characters</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            {hasConfirmError && <span className="error-text">Passwords do not match</span>}
          </div>

          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext} disabled={!isStep2Valid}>
            Next
          </button>
        </div>
      )}

      {currentStep === 3 && !isSuccess && (
        <div>
          <h2>Review & Submit</h2>

          <div className="review-box">
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Date of Birth:</strong> {formData.dob}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>

          <button onClick={handleBack}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}
