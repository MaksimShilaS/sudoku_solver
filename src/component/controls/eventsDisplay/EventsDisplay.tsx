import { CSSProperties, useEffect, useState } from 'react';

const DisplayStyles: CSSProperties = {
    border: '1px solid black',
    height: '540px',
    maxHeight: '540px',
    overflowY: 'scroll',
};

export const EVENTS: string[] = [];

export const EventsDisplay: React.FC = () => {
    const [eventsCount, setEventsCount] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (EVENTS.length > eventsCount) {
                setEventsCount(EVENTS.length);
                var eventsDisplay = document.getElementById('EventsDisplay');
                if (eventsDisplay) {
                    eventsDisplay.scrollTop = eventsDisplay.scrollHeight;
                }
            }
        }, 300);
        return () => clearInterval(interval);
    }, [eventsCount]);

    return (
        <>
            <div style={DisplayStyles} id='EventsDisplay'>
                {EVENTS.map((event, index) => (
                    <span className='d-block' key={index}>
                        {event}
                    </span>
                ))}
            </div>
        </>
    );
};
