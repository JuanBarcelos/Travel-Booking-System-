import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

export const PhoneInputField = ({ control, name, label, errors }) => {
  return (
    <>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={"br"} // Define Brasil como padrão
            enableSearch={true} // Permite buscar código de país
            inputStyle={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
            }}
            containerStyle={{
              width: "100%",
            }}
            onChange={(value) => field.onChange(value)} // Atualiza o estado corretamente
          />
        )}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </>
  );
};
