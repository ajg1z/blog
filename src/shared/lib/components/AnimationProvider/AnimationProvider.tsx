import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type GestureType = typeof import('@use-gesture/react');
type SpringType = typeof import('react-spring');

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const getAsyncAnimationModules = async () =>
    Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

const AnimationContext = createContext<AnimationContextPayload>({});

interface AnimationProviderProps {
    children?: ReactNode;
}

export const AnimationProvider: FC<AnimationProviderProps> = (props) => {
    const { children } = props;

    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;

            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(
        () => ({
            isLoaded,
            Spring: SpringRef.current,
            Gesture: GestureRef.current,
        }),
        [isLoaded],
    );

    if (!isLoaded) {
        return null;
    }

    return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};

export const useAnimationLibs = () =>
    useContext(AnimationContext) as Required<AnimationContextPayload>;
