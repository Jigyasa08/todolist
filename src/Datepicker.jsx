import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ task, onDateChange }) => {
  const handleDateChange = (date) => {
    const updatedTask = { ...task, dueDate: date };
    onDateChange(updatedTask);
  };
  return (
    <DatePicker
      className="date-picker"
      selected={task.dueDate}
      onChange={handleDateChange}
    />
  );
};

export default Datepicker;
