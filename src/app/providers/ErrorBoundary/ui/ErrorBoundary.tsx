import { ReactNode, Component, ErrorInfo, Suspense } from 'react';
import { PageError } from 'widgets/PageError/ui/PageError';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    info?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ info: errorInfo });
        console.warn(error, errorInfo);
    }

    render(): ReactNode {
        const { hasError, info } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback=''>
                    <PageError info={info} />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
