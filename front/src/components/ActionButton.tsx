
type ActionButtonProps = {
  label: string
  onClick?: VoidFunction
  isActive?: boolean
}

export const ActionButton = ({label, onClick, isActive} : ActionButtonProps) => (
  <button className={"action-btn" + (isActive ? " action-btn-active" : "")}onClick={onClick}>
    {label}
  </button>
)
