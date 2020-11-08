import React, { useEffect, useState } from 'react';

function SignatureType({onChange}) {
  const [type, setType] = useState(true);

  function onTypeToggle() {
    setType(!type);
    onChange(!type);
  }

  useEffect(() => onChange(type));

  return (
    <>
      <label>Тип подписи: *</label>

      <br/>

      <label>
        <input
          type="radio"
          checked={!type}
          onChange={onTypeToggle}/>Совмещенная</label>

      <br/>

      <label>
        <input
          type="radio"
          checked={type}
          onChange={onTypeToggle}/>Отделенная</label>
    </>
  )
}

export default SignatureType;
