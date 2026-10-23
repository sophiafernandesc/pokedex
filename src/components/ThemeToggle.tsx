import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pokedex-theme'

/** Leitura tolerante: navegação privativa pode bloquear o localStorage. */
function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

/**
 * O script em `index.html` já marcou `data-theme` antes da primeira pintura,
 * então o estado inicial só precisa concordar com o que está na tela.
 */
function readAppliedTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readAppliedTheme)

  // Efeito externo: refletir o tema no <html>, fora da árvore do React.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Enquanto não houver escolha salva, acompanha o tema do sistema.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')

    function followSystem(event: MediaQueryListEvent) {
      if (readStoredTheme() === null) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    query.addEventListener('change', followSystem)
    return () => {
      query.removeEventListener('change', followSystem)
    }
  }, [])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem persistência, o tema vale só para esta sessão.
    }
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className="flex items-center gap-1.5 rounded-full border border-edge-strong bg-surface px-3 py-1.5 text-xs font-bold text-ink-soft transition hover:bg-panel"
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      {isDark ? 'Light theme' : 'Dark theme'}
    </button>
  )
}
