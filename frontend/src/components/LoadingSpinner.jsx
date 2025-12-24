function LoadingSpinner ({ text = "Caricamento..." }) {
    return (
        <div className="loading-spinner">
            <span className="loader"></span>
            <span className="text">{text}</span>
        </div>
    )
}

export default LoadingSpinner;