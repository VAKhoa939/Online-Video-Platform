import '../../css/header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <img className="hamburger-menu" src="images/icons/hamburger-menu.svg"/>
        <img className="youtube-logo" src="images/icons/youtube-logo.svg"/>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"/>
        <button className="search-button">
          <img className="search-icon" src="images/icons/search.svg"/>
          <div className="tooltip">Search</div>
        </button>
        <button className="voice-search-button">
          <img className="voice-search-icon" src="images/icons/voice-search-icon.svg"/>
          <div className="tooltip">Search with your voice</div>
        </button>
      </div>

      <div className="right-section">
        <div className="tooltip-container">
          <img className="upload-icon" src="images/icons/upload.svg"/>
          <div className="tooltip">Create</div>
        </div>
        <div className="tooltip-container">
          <img className="youtube-apps-icon" src="images/icons/youtube-apps.svg"/>
          <div className="tooltip">YouTube apps</div>
        </div>
        <div className="tooltip-container">
          <img className="notifications-icon" src="images/icons/notifications.svg"/>
          <div className="notifications-count">3</div>
          <div className="tooltip">Notifications</div>
        </div>
        <a href="https://www.youtube.com/@SuperSimpleDev">
          <img className="current-user-picture" src="images/channel-pictures/my-channel.jpeg"/>
        </a>
      </div>
    </header>
  )
}

export default Header