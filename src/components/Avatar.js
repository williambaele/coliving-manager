import React from "react";

const Avatar = () => {
  return (
    <button className="rounded-full">
      <div className="relative rounded-full inline-block w-8 h-8 align-middle">
        <img className="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82" alt="Profile x ded spicture user"/>
      </div>
    </button>
  );
};

export default Avatar;
