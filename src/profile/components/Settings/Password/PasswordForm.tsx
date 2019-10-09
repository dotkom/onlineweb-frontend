import React, { FormEvent, useState } from 'react';
import style from './input.less';
import PasswordInput from './PasswordInput';
import { putPasswords } from 'profile/api/password';
import { IChangePasswordData, IChangePasswordResponse } from 'profile/models/Password';
import { ErrorMessage } from './ErrorMessage';

const PasswordForm = () => {
  const [inputs, setInputs] = useState<IChangePasswordData>({
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [errors, setErrors] = useState<IChangePasswordResponse>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response = await putPasswords(inputs);
    if (response) {
      setErrors(response);
    }
  };

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <form id={style.editPasswordInput} onSubmit={handleSubmit}>
      <PasswordInput
        label="Skriv inn ditt nåverende passord"
        name="current_password"
        requiredMessage={errors.current_password}
        required
        onChange={handleOnChange}
      />
      <PasswordInput
        label="Skriv inn et nytt passord"
        name="new_password"
        requiredMessage={errors.new_password}
        required
        onChange={handleOnChange}
      />
      <PasswordInput
        label="Gjenta det nye passordet"
        name="new_password_confirm"
        requiredMessage={errors.new_password_confirm}
        required
        onChange={handleOnChange}
      />
      <ErrorMessage errors={errors.non_field_errors} />
      <button type="submit" className={style.changePasswordButton}>
        Endre passord
      </button>
    </form>
  );
};

export default PasswordForm;
