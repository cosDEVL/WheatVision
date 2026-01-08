import { useEffect } from "react";
import { useState } from "react";

function LoadingSpinner ({ text = "Caricamento..." }) {

    // Stato per notificare l'utente che il caricamento potrebbe prolungare per via del Cold Start
    const [coldStartAdvice, setColdStartAdvice] = useState(false);

    useEffect(() => {
        const timer = setTimeout(()=> {
            setColdStartAdvice(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <div className="loading-spinner">
            <span className="loader"></span>
            <span className="text">{text}</span>
            {coldStartAdvice && <div className="cold-start-message">
                    <p><strong>Il server e' in caricamento...</strong></p>
                    <p>
                        Poiché viene utilizzato l'hosting gratuito di Render, il server va in pausa dopo un certo periodo di inattività (15 minuti).
                        Il primo caricamento potrebbe richiedere fino a <strong>50 secondi</strong> (Cold Start).
                    </p>
                    <p>Grazie per la pazienza! I caricamenti successivi saranno immediati.</p>
                    <>
                        <a 
                            href="https://render.com/docs/free#spinning-down-on-idle:~:text=Render%20spins%20down,will%20hang%20temporarily." 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Dettagli tecnici su Render docs
                        </a>
                    </>
                </div>
                }
        </div>
    )
}

export default LoadingSpinner;