import React from 'react';
import PropTypes from 'prop-types';

export default function TrashCan({ size, onClick }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 18H8V11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V11C18 10.4477 17.5523 10 17 10C16.4477 10 16 10.4477 16 11V18Z"
        fill="#B6FF6D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 6V5C14 4.44772 13.5523 4 13 4H11C10.4477 4 10 4.44772 10 5V6H6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8H18C18.5523 8 19 7.55228 19 7C19 6.44772 18.5523 6 18 6H14Z"
        fill="#B6FF6D"
      />
    </svg>
  );
}
TrashCan.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func,
};
