import { ChangeEvent, useState } from 'react'
import { FormSection, FormType } from './formTypes';

const App = () => {
  const [formName, setFormName] = useState<string>('')
  const [formSections, setFormSection] = useState<FormSection[]>([]);
  const [formInputTypeList, setFormInputTypeList] = useState<FormType[]>([]);

  const handleFormNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFormName(value);
  }

  return (
    <div className="container">
      <div className="container">
        <h1>Form Title</h1>
        <input id="name-input" name="form-name-input" type="text" onChange={handleFormNameChange} value={formName} />
      </div>
    </div>
  )
}

export default App
