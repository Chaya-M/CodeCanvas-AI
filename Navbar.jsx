import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = localStorage.getItem('genui-theme') || 'dark'
    setTheme(stored)
    applyTheme(stored)
  }, [])

  function applyTheme(nextTheme) {
    const root = document.documentElement
    if (nextTheme === 'light') {
      root.style.setProperty('--primary-bg', '#f5f5f7')
      root.style.setProperty('--secondary-bg', '#ffffff')
      root.style.setProperty('--tertiary-bg', '#f1f5f9')
      document.body.style.color = '#111827'
    } else {
      root.style.setProperty('--primary-bg', '#09090B')
      root.style.setProperty('--secondary-bg', '#141319')
      root.style.setProperty('--tertiary-bg', '#17171C')
      document.body.style.color = '#ffffff'
    }
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('genui-theme', next)
    applyTheme(next)
  }

  

  return (
    <>
      <div className="nav relative z-50 flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800 bg-[var(--primary-bg)]">
        <div className="logo">
          <h3 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-transparent bg-clip-text">
            CodeCanvas AI
          </h3>
        </div>

        <div className="icons flex items-center gap-[15px]">
          <button aria-label="Toggle theme" className="icon" onClick={toggleTheme} title="Toggle theme">
            <HiSun />
          </button>
          <div className="relative z-50">
            <button aria-label="Profile" className="icon" onClick={() => {
              setIsProfileOpen((v) => !v); setIsSettingsOpen(false)
            }} title="Profile">
              <FaUser />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 z-[60] mt-2 w-[220px] rounded-xl border border-zinc-700 bg-[var(--secondary-bg)] p-3 text-sm shadow-lg">
                <p className="font-semibold">Guest</p>
                <p className="text-gray-400 mt-1">No account linked.</p>
                <button className="mt-3 w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => setIsProfileOpen(false)}>Close</button>
              </div>
            )}
          </div>
          <div className="relative z-50">
            <button aria-label="Settings" className="icon" onClick={() => {
              setIsSettingsOpen((v) => !v); setIsProfileOpen(false)
            }} title="Settings">
              <RiSettings3Fill />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 z-[60] mt-2 w-[260px] rounded-xl border border-zinc-700 bg-[var(--secondary-bg)] p-3 text-sm shadow-lg">
                <p className="font-semibold">Settings</p>
                <div className="mt-2 flex items-center justify-between">
                  <span>Theme</span>
                  <button className="py-1 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </button>
                </div>
                <button className="mt-3 w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => setIsSettingsOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar