import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as Error & { statusText: string };
    console.error(error);

    return (
        <div id="error-page">
            <h1>wOops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to='/login'>home</Link>
        </div>
    );
}
