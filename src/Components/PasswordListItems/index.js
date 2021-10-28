import './index.css'

const PasswordListItems = props => {
  const {websiteDetails, deleteItem} = props
  const {
    website,
    username,
    password,
    initialContainer,
    id,
    showPassword,
  } = websiteDetails

  const initialName = username ? username[0].toUpperCase() : ''

  const onDeleteItem = () => {
    deleteItem(id)
  }

  return (
    <li className="password-list-items">
      <div className={initialContainer}>
        <p className="initial">{initialName}</p>
      </div>

      <div className="user-details-list">
        <p className="website-details">{website}</p>
        <p className="user-details">{username}</p>
        {showPassword ? (
          <p className="password-details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="no-passwords"
          />
        )}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordListItems
