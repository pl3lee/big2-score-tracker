import { ScoreTracker } from './features/base/ScoreTracker';
import { create } from 'zustand';
import * as stylex from '@stylexjs/stylex';

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
    const { setLanguage } = useLanguageStore();
    return (
        <div {...stylex.props(styles.root)}>
            <div {...stylex.props(styles.languageContainer)}>
                <button {...stylex.props(styles.button)} onClick={() => setLanguage('en')}>English</button>
                <button {...stylex.props(styles.button)} onClick={() => setLanguage('zh')}>中文</button>
            </div>
            <ScoreTracker />
        </div>
    );
}

export default App;
