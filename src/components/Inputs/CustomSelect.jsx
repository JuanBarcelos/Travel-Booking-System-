import { Controller } from "react-hook-form";

export const CustomSelect = ({ control, name, label, options, errors }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} id={name} className="custom-select">
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </>
  );
};
