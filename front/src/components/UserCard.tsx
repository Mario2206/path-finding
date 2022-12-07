import {User} from "../types/items";
import {formatDateToDayScope, formatDuration} from "../tools/date.formatter";

type Props = {
  user: User
  restaurant: string
}

export const UserCard = ({ user, restaurant } : Props) => {
  return (
    <div className="user-card">
      <div className="user-card--row">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.49 1.23L3.5 3.1C2.35 3.53 1.41 4.89 1.41 6.12V13.55C1.41 14.73 2.19 16.28 3.14 16.99L7.44 20.2C8.85 21.26 11.17 21.26 12.58 20.2L16.88 16.99C17.83 16.28 18.61 14.73 18.61 13.55V6.12C18.61 4.89 17.67 3.53 16.52 3.1L11.53 1.23C10.68 0.919998 9.32 0.919998 8.49 1.23V1.23Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.99999 9.91999H9.86999C8.92999 9.88999 8.17999 9.10999 8.17999 8.15999C8.17999 7.18999 8.96999 6.39999 9.93999 6.39999C10.91 6.39999 11.7 7.18999 11.7 8.15999C11.69 9.11999 10.94 9.88999 9.99999 9.91999ZM8.00999 12.72C7.04999 13.36 7.04999 14.41 8.00999 15.05C9.09999 15.78 10.89 15.78 11.98 15.05C12.94 14.41 12.94 13.36 11.98 12.72C10.9 11.99 9.10999 11.99 8.00999 12.72Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>{user.name}</p>
      </div>
      <div className="user-card--row">
        <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.02083 13.125H13.0812M8.02083 18.9583H13.0812M18.2292 32.0833H5.95C4.25833 32.0833 2.87292 30.7271 2.87292 29.0646V7.42292C2.87292 3.60208 5.71667 1.86667 9.20208 3.57292L15.6771 6.75208C17.0771 7.4375 18.2292 9.26042 18.2292 10.8062V32.0833ZM32.0396 21.9625V27.475C32.0396 30.625 30.5812 32.0833 27.4312 32.0833H18.2292V15.1958L18.9146 15.3417L25.4771 16.8146L28.4375 17.4708C30.3625 17.8937 31.9375 18.8854 32.025 21.6854C32.0396 21.7729 32.0396 21.8604 32.0396 21.9625V21.9625Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25.4771 16.8146V21.5104C25.4771 23.3188 24.0042 24.7917 22.1958 24.7917C20.3875 24.7917 18.9146 23.3188 18.9146 21.5104V15.3417L25.4771 16.8146ZM32.025 21.6854C31.9806 22.5226 31.6174 23.311 31.0099 23.8887C30.4023 24.4664 29.5967 24.7895 28.7583 24.7917C26.95 24.7917 25.4771 23.3188 25.4771 21.5104V16.8146L28.4375 17.4708C30.3625 17.8937 31.9375 18.8854 32.025 21.6854Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>
          {restaurant}
        </span>
      </div>
      <div className="user-card--row">
        <svg width="16" height="27" viewBox="0 0 16 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1V26M1.6306 3.5L11.8463 7.875C16.0082 9.625 16.0082 12.625 12.0985 14.625L1.6306 19.75" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        { user.departureTime ? formatDateToDayScope(user.departureTime) : null}
      </div>
      <div className="user-card--row">
        <svg width="22.75" height="25" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 7V12M18.75 12.25C18.75 17.08 14.83 21 10 21C5.17 21 1.25 17.08 1.25 12.25C1.25 7.42 5.17 3.5 10 3.5C14.83 3.5 18.75 7.42 18.75 12.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 1H13" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        { user.remainingTime ? formatDuration(user.remainingTime) : null}
      </div>
    </div>
  )
}
