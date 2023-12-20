type Props = {
  name: string
  trueText: string
  falseText: string
  onSwitch: (e: boolean) => void
}

const ToggleSwitch = ({ name, trueText, falseText, onSwitch }: Props) => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" name={name} id={name} className="toggle-switch-checkbox" onChange={e => onSwitch(e.target.checked)} />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" data-yes={trueText} data-no={falseText} />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  )
}

export default ToggleSwitch
