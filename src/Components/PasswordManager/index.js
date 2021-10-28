import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import PasswordListItems from '../PasswordListItems'

const initialBgClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isShowingPassword: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchResult = event => {
    this.setState({searchInput: event.target.value})
  }

  ShowPassword = () => {
    const {isShowingPassword} = this.state
    this.setState({isShowingPassword: !isShowingPassword})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const initialBgColors = `initial-container ${
      initialBgClassNames[
        Math.ceil(Math.random() * initialBgClassNames.length - 1)
      ]
    }`

    const newPasswordList = {
      id: v4(),
      username,
      website,
      password,
      initialContainer: initialBgColors,
      showPassword: false,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordList],
      username: '',
      website: '',
      password: '',
    }))
  }

  deleteItem = deleteId => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(
        deleteItem => deleteItem.id !== deleteId,
      ),
    })
  }

  getSearchResult = () => {
    const {passwordList, searchInput} = this.state
    const searchResultItems = passwordList.filter(eachItem =>
      eachItem.username.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResultItems
  }

  render() {
    const {website, username, password, searchInput, passwordList} = this.state
    const searchResults = this.getSearchResult()
    return (
      <div className="password-manager-bg-container">
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-bottom-container">
            <div className="form-card-container">
              <div className="form-password-container">
                <h1 className="heading">Add New Password</h1>
                <form className="form" onSubmit={this.onAddPassword}>
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="text"
                      value={website}
                      onChange={this.onChangeWebsite}
                      className="website-input"
                      placeholder="Enter Website"
                    />
                  </div>
                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="text"
                      value={username}
                      onChange={this.onChangeUsername}
                      className="website-input"
                      placeholder="Enter Username"
                    />
                  </div>

                  <div className="website-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="website-logo"
                    />
                    <hr className="line" />
                    <input
                      type="password"
                      value={password}
                      onChange={this.onChangePassword}
                      className="website-input"
                      placeholder="Enter Password"
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                  className="password-manager"
                  alt="password manager"
                />
              </div>
            </div>
            <div className="form-bottom-card-container">
              <div className="password-list-container">
                <div className="info-container">
                  <h1 className="password-heading">Your Passwords</h1>
                  <p className="count-list-items">{passwordList.length}</p>
                </div>
                <div className="search-results-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-results"
                  />
                  <hr className="line" />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={this.onSearchResult}
                    value={searchInput}
                  />
                </div>
              </div>
              <hr className="border-line" />
              <div className="show-password-container">
                <button
                  className="show-password-button"
                  type="button"
                  onClick={this.ShowPassword}
                >
                  <input
                    type="checkbox"
                    className="radio-box"
                    id="password"
                    onClick={this.showPw}
                  />
                </button>
                <label className="show-password-heading" htmlFor="password">
                  Show Passwords
                </label>
              </div>
              {passwordList.length === 0 ? (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords"
                  />
                  <p className="no-password-heading">No Passwords</p>
                </div>
              ) : (
                <ul className="list-items">
                  {searchResults.map(eachItem => (
                    <PasswordListItems
                      key={eachItem.id}
                      websiteDetails={eachItem}
                      deleteItem={this.deleteItem}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
