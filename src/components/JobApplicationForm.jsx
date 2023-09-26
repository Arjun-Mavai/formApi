import { useReducer } from "react";
import formFields from "../formData.json";
import axios from "axios";

// In this format, the keys are not enclosed in double quotes, which is how you typically define an object in JavaScript.
//  You can use this format directly as the initial state in your useReducer hook.

const initialState = {
  agreeOnTakeTest: false,
  name: "",
  email: "",
  yearOfExperience: 0,
  rateOptimization: 0,
  github: "",
  linkedin: "",
  phone: "",
  techstack: [
    "ReactJS",
    "HTML",
    "CSS",
    "Javascript",
    "Tailwind CSS",
    "React-Router",
    "React-Query",
  ],
  relocatable: false,
  goal: "",
  achievement: "",
  why: "",
  reason: "",
  currentSalary: 0,
  expectedSalary: 0,
  noticePeriod: 0,
  react: 0,
  typescript: 0,
  next: 0,
  sass: 0,
  figma: 0,
  semanticHtml: 0,
  storybook: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "Set_Fields":
      return {
        ...state,
        [action.field]: action.value,
        // value:type === 'checkbox'?checked : value
      };
  }
};

const JobApplicationForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = async (e) => {
    e.preventDefault();

    console.log(e.target.name);

    const { name, value, checked, type } = e.target;

    dispatch({
      type: "Set_Fields",
      field: name, ////// field: name(this name is like e.target.name value is like e.target.value , attributes of the input field)
      value: type === "checkbox" ? checked : value, // it could be written like this field : name ,value , to use them here extract in e.target object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(
        "Hitting URL:",
        "https://jsonplaceholder.typicode.com/todos/1"
      );

      console.log(state);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1",
        state
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
      if (error.response) {
        console.error("Server responded with", error.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-2xl">
      <form onSubmit={handleSubmit} className=" w-full max-w-lg">
        {formFields.map((field, index) => (
          <div className="mb-6" key={index}>
            <label className="block capitalize font-bold">
              {field.fieldName}
            </label>
            <div className="mt-2">
              <input
                className="w-full text-black border border-black rounded-lg py-2 px-4"
                type={field.type}
                name={field.fieldName}
                value={state[field.fieldName]}
                onChange={handleChange}
                checked={
                  field.type === "checkbox" ? state[field.fieldName] : undefined
                }
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 text-white w-full  rounded-md shadow-md py-2 px-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
