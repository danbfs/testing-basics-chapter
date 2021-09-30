import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export type FormData = {
  firstName: string;
  lastName: string;
};

const Form: React.FC<{ saveData: (data: FormData) => void }> = ({
  saveData,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const [savedInfo, setSavedInfo] = useState<FormData>();

  const handleEmptyFields = () => {
    if (!getValues().firstName) {
      setError("firstName", { type: "manual", message: "Field required!" });
    }
    if (!getValues().lastName) {
      setError("lastName", { type: "manual", message: "Field required!" });
    }
  };

  const onSubmit = handleSubmit((data) => {
    handleEmptyFields();
    saveData(data);
  });

  const fillMock = () => {
    setValue("firstName", "Mock name");
    setValue("lastName", "Mock lastname");
  };

  const saveInfo = () => {
    setSavedInfo(getValues());
  };

  const fillInfo = () => {
    if (savedInfo?.firstName && savedInfo?.lastName) {
      setValue("firstName", savedInfo?.firstName || "");
      setValue("lastName", savedInfo?.lastName || "");
    } else {
      if (!savedInfo?.firstName) {
        setError("firstName", {
          type: "manual",
          message: "No saved info",
        });
      }
      if (!savedInfo?.lastName) {
        setError("lastName", {
          type: "manual",
          message: "No saved info",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="firstName">First name</label>
        <input aria-label="First name" {...register("firstName")} />
        <ErrorMessage
          errors={errors}
          name="firstName"
          render={({ message }) => <p className="error">{message}</p>}
        />
        <label htmlFor="lastName">Last name</label>
        <input aria-label="Last name" {...register("lastName")} />
        <ErrorMessage
          errors={errors}
          name="lastName"
          render={({ message }) => <p className="error">{message}</p>}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={fillMock}>Fill mock</button>
      <button onClick={saveInfo}>Save info</button>
      <button onClick={fillInfo}>Fill info</button>
    </div>
  );
};

export default Form;
