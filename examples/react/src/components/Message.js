import React, { useEffect, useState } from 'react';

function Message({onChange}) {
  const [message, setMessage] = useState('Привет мир!');

  function onMessageChange(event) {
    setMessage(event.target.value);
    onChange(event.target.value);
  }

  useEffect(() => onChange(message));

  return (
    <>
      <legend>Создание подписи</legend>

      <label htmlFor="message">Подписываемое сообщение: *</label>

      <br/>

      <textarea
        id="message"
        name="message"
        cols="80"
        rows="5"
        placeholder="Введите сообщение"
        value={message}
        onChange={onMessageChange}
        autoFocus
        required/>
    </>
  );
}

export default Message;
