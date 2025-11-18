import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const VIEW_OPTIONS = [
  { value: 'globe', label: 'Globe', aria: 'Switch to globe view' },
  { value: 'map', label: '2D Map', aria: 'Switch to 2D map view' }
]

export default function MapToggle ({ value, onChange }) {
  return (
    <ToggleButtonGroup
      type="radio"
      name="viewMode"
      value={value}
      onChange={onChange}
      className="map-toggle"
      role="group"
      aria-label="Choose between globe or map view"
    >
      {VIEW_OPTIONS.map((option) => (
        <ToggleButton
          id={`view-mode-${option.value}`}
          key={option.value}
          value={option.value}
          variant={value === option.value ? 'primary' : 'outline-secondary'}
          aria-label={option.aria}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
