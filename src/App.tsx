import { ScoreTracker } from './features/base/ScoreTracker';
import { create } from 'zustand';
import * as stylex from '@stylexjs/stylex';
import { Helmet } from "react-helmet";
import { translations } from './utils/translations';
import favicon from './favicon.ico'

type LanguageStore = {
    language: string;
    setLanguage: (language: string) => void;
};


export const useLanguageStore = create<LanguageStore>()(set => ({
    language: 'zh',
    setLanguage: (language: string) => set({ language }),
}));
const styles = stylex.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    languageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '1rem',
        width: '100%',
    },
    button: {
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    }
});

function App() {
    const { language, setLanguage } = useLanguageStore();
    return (
        <div {...stylex.props(styles.root)}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{translations[language as keyof typeof translations].name}</title>
                <link id="favicon" rel="icon" href={favicon} type="image/x-icon" />
            </Helmet>
            <div {...stylex.props(styles.languageContainer)}>
                <button {...stylex.props(styles.button)} onClick={() => setLanguage('en')}>English</button>
                <button {...stylex.props(styles.button)} onClick={() => setLanguage('zh')}>中文</button>
            </div>
            <ScoreTracker />
        </div>
    );
}

export default App;
