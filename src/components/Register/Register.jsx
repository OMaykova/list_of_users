import React, { useState } from "react";
import "./Register.css";

function Register({handleReqest}) {
  const [formValues, setFormValues] = useState({name:'', email:'', password:'', confirmPassword:''})
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    if (name === 'name') {
      const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(value);
      setIsValidName(validName)
      if (value.length < 1) {
        setNameError('Необходимо заполнить это поле');
      } else if (value.length < 2) {
        setNameError('Длина имени должна быть не менее 2 символов');
        setIsValidName(false)
      } else if (!validName) {
        setNameError('Имя может содержать только буквы, пробел или дефис');
      } else {
        setNameError('');
      }
    } else if (name === 'email') {
      const validEmail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(value);
      setIsValidEmail(validEmail)
      if (!validEmail) {
        setEmailError('Неверный формат почты')
      } else {
        setEmailError('')
      }
    } else if (name === 'password' || name === 'confirmPassword') {
      if (value.length < 1) {
        setPasswordError('Необходимо заполнить это поле');
      } else if (value.length < 3) {
        setPasswordError('Пароль должен содержать не менее 3 символов');
        } else {
          setIsValidPassword(true);
          setPasswordError('');
        }
    }
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    const { password, confirmPassword } = formValues;
    if (!formValues.name || !formValues.email || !password || !confirmPassword) {
      return;
      }
    if (confirmPassword !== password) {
      setPasswordError('Пароли не совпадают!');
      return;
    }
    handleReqest({name:formValues.name, password: formValues.password, email: formValues.email })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <section className="register">
      <div className="register-container">
        <h3 className='register__title'>Регистрация</h3>
        <form onSubmit={handleSubmit} className='register__form' name='register' noValidate>
          <div className='form-input'>
            <p className='form-input__title'>Имя</p>
            <input className='form-input__value' onChange={handleChange} id="name-input" name='name' type='text' value={formValues.name} placeholder='Имя' required />
          </div>
          <span className='input-error'>{nameError}</span>
          <div className='form-input'>
            <p className='form-input__title'>Электронная почта</p>
            <input className='form-input__value' onChange={handleChange} id="email-input" name='email' type='email' value={formValues.email} placeholder='example@mail.ru' required />
          </div>
          <span className='input-error'>{emailError}</span>
          <div className='form-input'>
            <p className='form-input__title'>Пароль</p>
            <input className='form-input__value' onChange={handleChange} id="password-input" name='password' type='password' value={formValues.password} placeholder='Введите пароль' required />
          </div>
          <span className='input-error'>{passwordError}</span>
          <div className='form-input'>
            <p className='form-input__title'>Подтвердить пароль</p>
            <input className='form-input__value' onChange={handleChange} id="confirmPassword" name='confirmPassword' type='password' value={formValues.confirmPassword} placeholder='Повторите пароль' required />
          </div>
          <span className='input-error'>{passwordError}</span>
          <button className={`form__button ${isValidName && isValidEmail && isValidPassword ? '' : 'form__button_disabled'}`} disabled={isValidName && isValidEmail && isValidPassword ? '' : 'disabled'}>Зарегистрироваться</button>
      </form>
      </div>
    </section>
  )
}

export default Register;