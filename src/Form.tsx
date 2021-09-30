import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function Form() {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
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
    console.log(data);
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
    console.log(errors);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>First name</label>
        <input {...register("firstName")} />
        <ErrorMessage
          errors={errors}
          name="firstName"
          render={({ message }) => <p className="error">{message}</p>}
        />
        <label>Last name</label>
        <input {...register("lastName")} />
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
}
