"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

const InfoTab = () => {
  const [user, setUser] = useState({
    first_name: "John",
    last_name: "",
    date_of_birth: "",
    email: "",
  });
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("onSubmit");
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers.splice(index, 1);
    setPhoneNumbers(newPhoneNumbers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex justify-start items-center gap-2 ">
        <label className="block text-right text-gray-700 w-1/4">نام:</label>
        <input
          {...register("first_name", { value: user?.first_name })}
          className="input input-bordered input-warning w-full max-w-xs"
          type="text"
          value={user?.first_name}
        />
      </div>
      <div className="mb-4 flex justify-start items-center gap-2 ">
        <label className="block text-right text-gray-700 w-1/4">
          نام خانوادگی:
        </label>
        <input
          {...register("last_name", { value: user?.last_name })}
          className="input input-bordered input-warning w-full max-w-xs"
          type="text"
          value={user?.last_name}
        />
      </div>
      <div className="mb-4 flex justify-start items-center gap-2 ">
        <label className="block text-right text-gray-700 w-1/4">
          تاریخ تولد:
        </label>
        <input
          {...register("date_of_birth", { value: user?.date_of_birth })}
          className="input input-bordered input-warning w-full max-w-xs"
          value={user?.date_of_birth}
        />
      </div>
      <div className="mb-4 flex justify-start items-center gap-2 ">
        <label className="block text-right text-gray-700 w-1/4">ایمیل:</label>
        <input
          {...register("email", { value: user?.email })}
          className="input input-bordered input-warning w-full max-w-xs"
          value={user?.email}
        />
      </div>
      <div className="mb-4 flex gap-2">
        <label className="block text-right text-gray-700 w-1/4">
          شماره دوستان:
        </label>
        {phoneNumbers.map((phoneNumber, index) => (
          <div key={index} className="mb-4 flex justify-start items-center gap-2 flex-grow">
            <input
              className="input input-bordered input-warning w-full max-w-xs"
              type="text"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
            />
            {index > 0 && (
              <button
                className="ml-2 text-4xl text-red-500"
                onClick={() => handleRemovePhoneNumber(index)}
              >
                -
              </button>
            )}
            {index === phoneNumbers.length - 1 && (
              <button
                className="ml-2 text-2xl text-green-500"
                onClick={handleAddPhoneNumber}
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-xs lg:ml-32">
          <button
            type="submit"
            className="btn btn-success w-full"
          >
            ارسال
          </button>
        </div>
      </div>
    </form>
  );
};

export default InfoTab;
