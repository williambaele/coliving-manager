import React from "react";



const Button = ({ message, icon }) => {
  return (
    <button
      type="submit"
      class="flex justify-between items-center gap-3 rounded-lg bg-[#7D3AF2] hover:bg-[#7D3AF2]/90 px-3 md:px-5 py-1 md:py-2 text-xs md:text-sm font-large text-white"
    >
      {icon}
      {message}
    </button>
  );
};

export default Button;
