import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

function useTheme() {

    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('useTheme() doit être utilisé dans un ThemeProvider')
    }

    return context
}

export default useTheme;