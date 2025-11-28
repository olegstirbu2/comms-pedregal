// Custom icons extracted from Figma design
// Based on Pedregal-Prototypes (node-id=484-162090)

export function ChatDefaultLineIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18.5859L6 16.5859C6.37504 16.2109 6.88369 16 7.41406 16H18C19.1046 16 20 15.1046 20 14V6ZM13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H13ZM17 7C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H7C6.44772 9 6 8.55228 6 8C6 7.44772 6.44772 7 7 7H17ZM22 14C22 16.2091 20.2091 18 18 18H7.41406L3.70703 21.707C3.42103 21.993 2.99086 22.0786 2.61719 21.9238C2.24359 21.769 2 21.4044 2 21V6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V14Z" fill="currentColor"/>
    </svg>
  );
}

export function PromoLineIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.47266 1.03906C7.11187 -0.187594 8.88812 -0.187593 9.52734 1.03906L9.58789 1.16602L11.1611 4.83789L14.834 6.41211C16.2298 7.01032 16.2298 8.98968 14.834 9.58789L11.1611 11.1611L9.58789 14.834C8.98967 16.2298 7.01032 16.2298 6.41211 14.834L4.83789 11.1611L1.16602 9.58789C-0.229761 8.98967 -0.229761 7.01033 1.16602 6.41211L4.83789 4.83789L6.41211 1.16602L6.47266 1.03906ZM6.63379 5.72656C6.45907 6.13421 6.13421 6.45908 5.72656 6.63379L2.53906 8L5.72656 9.36621C6.0834 9.51914 6.37674 9.78716 6.56152 10.125L6.63379 10.2734L8 13.46L9.36621 10.2734C9.54092 9.8658 9.8658 9.54093 10.2734 9.36621L13.46 8L10.2734 6.63379C9.8658 6.45907 9.54092 6.13421 9.36621 5.72656L8 2.53906L6.63379 5.72656Z" fill="currentColor"/>
      <path d="M2 0C2.55228 0 3 0.447715 3 1C3.55228 1 3.99999 1.44772 4 2C4 2.55228 3.55228 3 3 3C3 3.55228 2.55228 4 2 4C1.44772 3.99999 1 3.55228 1 3C0.447725 2.99999 -9.31905e-10 2.55228 0 2C5.45533e-06 1.44773 0.447728 1.00001 1 1C1 0.447722 1.44772 1.09522e-05 2 0Z" fill="currentColor"/>
    </svg>
  );
}

export function LanguageLineIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2 8H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 2C9.5 4 10 6 10 8C10 10 9.5 12 8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 2C6.5 4 6 6 6 8C6 10 6.5 12 8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SendFillIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ transform: 'rotate(45deg)' }}>
      <path d="M19.9389 5.34428C20.073 4.9786 19.9825 4.56833 19.7071 4.29292C19.4317 4.01751 19.0214 3.92707 18.6557 4.06115L3.65575 9.56115C3.26041 9.70611 2.99824 10.0832 3.00001 10.5042C3.00178 10.9253 3.26712 11.3001 3.66366 11.4418L8.89772 13.3111C8.95529 13.2378 9.02194 13.1697 9.09759 13.1082L15.7256 7.72295C15.8815 7.59627 16.108 7.60795 16.25 7.75C16.392 7.89205 16.4037 8.11849 16.2771 8.2744L10.8918 14.9024C10.8303 14.978 10.7622 15.0447 10.6889 15.1023L12.5583 20.3364C12.6999 20.7329 13.0747 20.9982 13.4958 21C13.9169 21.0018 14.2939 20.7396 14.4389 20.3443L19.9389 5.34428Z" fill="currentColor"/>
    </svg>
  );
}

export function AddIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M7 14V9H2C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7H7V2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2V7H14C14.5523 7 15 7.44772 15 8C15 8.55228 14.5523 9 14 9H9V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14Z" fill="currentColor"/>
    </svg>
  );
}

export function SmileyHappyLineIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="currentColor"/>
      <path d="M4.73224 8.8669C5.17382 8.5353 5.80097 8.62456 6.13263 9.06611C6.56002 9.63505 7.23713 9.99971 7.99982 9.99971C8.76251 9.99968 9.43963 9.63507 9.867 9.06611C10.1987 8.62453 10.8258 8.53521 11.2674 8.8669C11.7089 9.19854 11.7981 9.82571 11.4666 10.2673C10.6777 11.3175 9.41814 11.9997 7.99982 11.9997C6.58146 11.9997 5.3219 11.3176 4.53302 10.2673C4.20143 9.8257 4.29069 9.19856 4.73224 8.8669Z" fill="currentColor"/>
      <path d="M7 6.25C7 6.94036 6.44036 7.5 5.75 7.5C5.05964 7.5 4.5 6.94036 4.5 6.25C4.5 5.55964 5.05964 5 5.75 5C6.44036 5 7 5.55964 7 6.25Z" fill="currentColor"/>
      <path d="M11.4995 6.25C11.4995 6.94036 10.9398 7.5 10.2495 7.5C9.55909 7.5 8.99945 6.94036 8.99945 6.25C8.99945 5.55964 9.55909 5 10.2495 5C10.9398 5 11.4995 5.55964 11.4995 6.25Z" fill="currentColor"/>
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M10 4L6 8L10 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function CirclesFourIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.625 0C1.62297 0 0 1.62297 0 3.625C0 5.62703 1.62297 7.25 3.625 7.25C5.62703 7.25 7.25 5.62703 7.25 3.625C7.25 1.62297 5.62703 0 3.625 0ZM2 3.625C2 2.72754 2.72754 2 3.625 2C4.52246 2 5.25 2.72754 5.25 3.625C5.25 4.52246 4.52246 5.25 3.625 5.25C2.72754 5.25 2 4.52246 2 3.625Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.625 8.75C1.62297 8.75 0 10.373 0 12.375C0 14.377 1.62297 16 3.625 16C5.62703 16 7.25 14.377 7.25 12.375C7.25 10.373 5.62703 8.75 3.625 8.75ZM2 12.375C2 11.4775 2.72754 10.75 3.625 10.75C4.52246 10.75 5.25 11.4775 5.25 12.375C5.25 13.2725 4.52246 14 3.625 14C2.72754 14 2 13.2725 2 12.375Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.75 3.625C8.75 1.62297 10.373 0 12.375 0C14.377 0 16 1.62297 16 3.625C16 5.62703 14.377 7.25 12.375 7.25C10.373 7.25 8.75 5.62703 8.75 3.625ZM12.375 2C11.4775 2 10.75 2.72754 10.75 3.625C10.75 4.52246 11.4775 5.25 12.375 5.25C13.2725 5.25 14 4.52246 14 3.625C14 2.72754 13.2725 2 12.375 2Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.375 8.75C10.373 8.75 8.75 10.373 8.75 12.375C8.75 14.377 10.373 16 12.375 16C14.377 16 16 14.377 16 12.375C16 10.373 14.377 8.75 12.375 8.75ZM10.75 12.375C10.75 11.4775 11.4775 10.75 12.375 10.75C13.2725 10.75 14 11.4775 14 12.375C14 13.2725 13.2725 14 12.375 14C11.4775 14 10.75 13.2725 10.75 12.375Z" fill="currentColor"/>
    </svg>
  );
}

export function CloseCircleIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function LanguageIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.00024 2C8.55253 2 9.00024 2.44772 9.00024 3V4H14.0002C14.5525 4 15.0002 4.44772 15.0002 5C15.0002 5.55228 14.5525 6 14.0002 6H12.7715C12.2796 7.56658 11.1764 9.66408 9.38846 11.7112C10.0837 12.3635 10.866 12.9969 11.7401 13.5858C12.1982 13.8944 12.3193 14.5158 12.0107 14.9739C11.7022 15.4319 11.0807 15.5531 10.6227 15.2445C9.6476 14.5876 8.7752 13.8802 8.00024 13.1512C6.51131 14.5518 4.66303 15.8724 2.4193 16.908C1.91785 17.1394 1.32372 16.9205 1.09228 16.4191C0.860842 15.9176 1.07973 15.3235 1.58118 15.092C3.6057 14.1576 5.27109 12.9693 6.61202 11.7112C4.82406 9.66408 3.7209 7.56658 3.22894 6H2.00024C1.44796 6 1.00024 5.55228 1.00024 5C1.00024 4.44772 1.44796 4 2.00024 4H7.00024V3C7.00024 2.44772 7.44796 2 8.00024 2ZM5.35027 6C5.81434 7.17478 6.67106 8.70674 8.00024 10.2591C9.32942 8.70674 10.1861 7.17478 10.6502 6H5.35027ZM17.5002 7C17.9039 7 18.268 7.24274 18.4233 7.61538L23.4233 19.6154C23.6357 20.1252 23.3947 20.7107 22.8849 20.9231C22.3751 21.1355 21.7896 20.8944 21.5772 20.3846L20.3752 17.5H14.6252L13.4233 20.3846C13.2109 20.8944 12.6254 21.1355 12.1156 20.9231C11.6058 20.7107 11.3647 20.1252 11.5772 19.6154L16.5772 7.61538C16.7324 7.24274 17.0965 7 17.5002 7ZM15.4586 15.5H19.5419L17.5002 10.6L15.4586 15.5Z" fill="currentColor"/>
    </svg>
  );
}

export function ChevronUpIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 10L8 6L12 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function NotebookLineIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V17C2.44772 17 2 16.5523 2 16C2 15.4477 2.44772 15 3 15V13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11V9C2.44772 9 2 8.55228 2 8C2 7.44772 2.44772 7 3 7V6ZM5 17H6C6.55228 17 7 16.5523 7 16C7 15.4477 6.55228 15 6 15H5V13H6C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11H5V9H6C6.55228 9 7 8.55228 7 8C7 7.44772 6.55228 7 6 7H5V6C5 5.44772 5.44772 5 6 5H8V19H6C5.44772 19 5 18.5523 5 18V17ZM10 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H10V19Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export function EditAddLineIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path 
        d="M15.293 3.29109C16.788 1.7962 19.212 1.7962 20.707 3.29109C22.2021 4.78613 22.202 7.21005 20.707 8.70515L7 22.4122C6.62496 22.7872 6.11631 22.9981 5.58594 22.9981H3C1.89543 22.9981 1 22.1027 1 20.9981V18.4122C1.00012 17.8819 1.21097 17.3731 1.58594 16.9981L15.293 3.29109ZM18 21.9981V19.9981H16C15.4477 19.9981 15 19.5504 15 18.9981C15.0002 18.446 15.4478 17.9981 16 17.9981H18V15.9981C18.0002 15.446 18.4478 14.9981 19 14.9981C19.5522 14.9981 19.9998 15.446 20 15.9981V17.9981H22C22.5522 17.9981 22.9998 18.446 23 18.9981C23 19.5504 22.5523 19.9981 22 19.9981H20V21.9981C20 22.5504 19.5523 22.9981 19 22.9981C18.4477 22.9981 18 22.5504 18 21.9981ZM19.293 4.70515C18.579 3.99131 17.421 3.99131 16.707 4.70515L15.4141 5.99812L18 8.58406L19.293 7.29109C20.0069 6.57703 20.007 5.41915 19.293 4.70515ZM3 20.9981H5.58594L16.5859 9.99812L14 7.41219L3 18.4122V20.9981Z" 
        fill="currentColor"
      />
    </svg>
  );
}

