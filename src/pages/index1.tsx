import React, { useState, useContext } from 'react'
const themes = {
  light: {
    foreground: '#000000',
    background: '#000',
  },
  dark: {
    foreground: '#ffffff',
    background: '#FFF',
  },
}

const ThemeContext = React.createContext({ themes: {} })

function App() {
  const [theme, setTheme] = useState('dark')
  return (
    <ThemeContext.Provider value={{ themes: themes, theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton() {
  const { themes, theme, setTheme } = useContext(ThemeContext)
  const t = themes[theme]
  return (
    <button
      onClick={() => {
        setTheme('light')
      }}
      style={{ background: t.background, color: t.foreground }}
    >
      I am styled by theme context!
    </button>
  )
}
export default App
