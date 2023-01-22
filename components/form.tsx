import { useRouter } from "next/router";
import { FormEvent, useState, useRef } from "react";

const Form = () => {
  const [city, setCity] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const focusInput = () => inputRef?.current?.focus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?city=${city}`);
  };

  return (
    <form data-testid="form" className="flex gap-2" onSubmit={handleSubmit}>
      <label
        data-testid="weather-search-label"
        htmlFor="city"
        className="text-lg self-center"
        onClick={focusInput}
      >
        Weather Search:
      </label>
      <div className="flex">
        <input
          data-testid="weather-search-input"
          ref={inputRef}
          type="text"
          id="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setCity(e.target.value)}
          aria-label="City Search"
        />
        <button
          data-testid="submit-btn"
          className="bg-blue-450 text-white p-3 rounded-r-xl"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default Form;
