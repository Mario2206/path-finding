
type ActionButtonProps = {
  label: string
}

export const ActionButton = ({label} : ActionButtonProps) => (
  <button className="action-btn">
    {label}
  </button>
)
