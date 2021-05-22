import './App.css'

const App = () => {
  const onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { message: 'upload' })
      }
    })
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Leetbot extension!!.</p>
        <button onClick={onclick}>Send Data</button>
      </header>
    </div>
  )
}

export default App
