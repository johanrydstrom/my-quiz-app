import { SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
   options: string[]
   label: string
}

export const Dropdown = (props: Props) => {
   return (
      <label className="form-label">
         {props.label}
         <select onChange={props.onChange}>
            {props.options.map((option, index) => (
               <option key={index}>{option}</option>
            ))}
         </select>
      </label>
   );
}